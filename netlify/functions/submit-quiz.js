const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ConvertKit API endpoint
const CONVERTKIT_API_URL = 'https://api.convertkit.com/v3';
const CONVERTKIT_API_SECRET = process.env.CONVERTKIT_API_SECRET;

// Map constraint IDs to tag names
const constraintTags = {
  cash: 'constraint-cash-flow',
  sales: 'constraint-sales-growth',
  dependency: 'constraint-business-dependency',
  marketing: 'constraint-marketing-performance',
  salesProcess: 'constraint-sales-process',
  customerSatisfaction: 'constraint-customer-satisfaction',
  leadership: 'constraint-leadership',
  team: 'constraint-team-competence',
  systems: 'constraint-systems-processes'
};

async function addToConvertKit(email, name, constraintType) {
  try {
    // Add subscriber to ConvertKit
    const response = await fetch(`${CONVERTKIT_API_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_secret: CONVERTKIT_API_SECRET,
        email: email,
        first_name: name,
        tags: [constraintTags[constraintType]]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('ConvertKit error:', data);
      throw new Error(data.message || 'Failed to add to ConvertKit');
    }

    console.log('Successfully added to ConvertKit:', email);
    return data;
  } catch (error) {
    console.error('Error adding to ConvertKit:', error);
    // Don't throw - we want to save to Supabase even if Kit fails
    return null;
  }
}

function findPrimaryConstraint(answers) {
  // Find lowest score (earliest question breaks ties)
  const questionOrder = ['cash', 'sales', 'dependency', 'marketing', 'salesProcess', 
                         'customerSatisfaction', 'leadership', 'team', 'systems'];
  
  let lowestScore = 5;
  let primaryConstraint = null;
  
  for (const questionId of questionOrder) {
    const score = answers[questionId];
    if (score < lowestScore) {
      lowestScore = score;
      primaryConstraint = questionId;
    }
  }
  
  return primaryConstraint;
}

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the incoming data
    const data = JSON.parse(event.body);
    const { name, email, answers } = data;

    // Validate required fields
    if (!name || !email || !answers) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Find primary constraint
    const primaryConstraint = findPrimaryConstraint(answers);

    // Add to ConvertKit first (doesn't block if it fails)
    await addToConvertKit(email, name, primaryConstraint);

    // Insert user into Supabase
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([{ name, email }])
      .select()
      .single();

    if (userError) throw userError;

    // Insert quiz responses
    const { data: responseData, error: responseError } = await supabase
      .from('quiz_responses')
      .insert([{
        user_id: userData.id,
        cash: answers.cash,
        sales: answers.sales,
        dependency: answers.dependency,
        marketing: answers.marketing,
        sales_process: answers.salesProcess,
        customer_satisfaction: answers.customerSatisfaction,
        leadership: answers.leadership,
        team: answers.team,
        systems: answers.systems
      }])
      .select()
      .single();

    if (responseError) throw responseError;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Quiz submitted successfully',
        userId: userData.id,
        primaryConstraint: primaryConstraint
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save quiz results', details: error.message })
    };
  }
};
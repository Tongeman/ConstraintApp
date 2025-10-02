const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ConvertKit API endpoint
const CONVERTKIT_API_SECRET = process.env.CONVERTKIT_API_SECRET;

// Map constraint IDs to tag names
const constraintTagIds = {
  cash: '11214248',  
  sales: '11214251',
  dependency: '11214282',
  marketing: '11214284',
  salesProcess: '11214286',
  customerSatisfaction: '11214287',
  leadership: '11214334',
  team: '11214337',
  systems: '11214339'
};

async function addToConvertKit(email, name, constraintType) {
  try {
    const tagId = constraintTagIds[constraintType];
    
    // Step 1: Add subscriber
    const subscriberResponse = await fetch(`https://api.kit.com/v4/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Kit-Api-Key': CONVERTKIT_API_SECRET
      },
      body: JSON.stringify({
        email_address: email,
        first_name: name
      })
    });

    const subscriberData = await subscriberResponse.json();
    
    if (!subscriberResponse.ok) {
      console.error('ConvertKit subscriber error:', subscriberData);
      throw new Error('Failed to add subscriber');
    }

    console.log('Successfully added subscriber to Kit:', email);

    // Step 2: Add tag
    const tagResponse = await fetch(`https://api.kit.com/v4/tags/${tagId}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Kit-Api-Key': CONVERTKIT_API_SECRET
      },
      body: JSON.stringify({
        email_address: email
      })
    });

    const tagData = await tagResponse.json();
    
    if (!tagResponse.ok) {
      console.error('ConvertKit tagging error:', tagData);
      // Don't throw - subscriber was added successfully
    } else {
      console.log('Successfully tagged subscriber:', email, 'with tag ID:', tagId);
    }

    return { subscriberData, tagData };
  } catch (error) {
    console.error('Error adding to ConvertKit:', error.message);
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
    const { name, email, emailConsent, answers, questionnaireVersion } = data;

    // Validate required fields
    if (!name || !email || !answers || !questionnaireVersion) {
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
      .insert([{ name, email, email_consent: emailConsent }])
      .select()
      .single();

    if (userError) throw userError;

    // Insert submission
    const { data: submissionData, error: submissionError } = await supabase
      .from('submissions')
      .insert([{
        user_id: userData.id,
        questionnaire_version: questionnaireVersion,
        primary_constraint: primaryConstraint
      }])
      .select()
      .single();

    if (submissionError) throw submissionError;

    // Insert all responses
    const responsesToInsert = Object.entries(answers).map(([questionId, answerValue]) => ({
      submission_id: submissionData.id,
      question_id: questionId,
      answer_value: answerValue
    }));

    const { error: responsesError } = await supabase
      .from('responses')
      .insert(responsesToInsert);

    if (responsesError) throw responsesError;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Quiz submitted successfully',
        userId: userData.id,
        submissionId: submissionData.id,
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
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

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

    // Insert user
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
        userId: userData.id
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
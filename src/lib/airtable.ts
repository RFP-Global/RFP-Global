import { z } from "zod";
import env from "./env";

// Airtable configuration
const AIRTABLE_BASE_ID = "appD4vwvSQDkhSaiZ";
const AIRTABLE_TABLE_ID = "tblkjDfKNB2uI00Oy";
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;

// Get API key from environment variables
const AIRTABLE_API_KEY = env.AIRTABLE_API_KEY;

// Application form schema with only name required
export const formSchema = z.object({
  // Name is the only required field
  name: z.string().min(2, { message: "Name is required" }),
  
  // All other fields are optional
  email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  companyName: z.string().optional().or(z.literal("")),
  zipCode: z.string().optional().or(z.literal("")),
  businessType: z.enum(["borrower", "lender"]).optional(),
  industry: z.string().optional().or(z.literal("")),
  financingAmount: z.enum(["<$250K", "$250K–$1M", "$1M–$5M", "$5M+"]).optional(),
  purpose: z.string().optional().or(z.literal("")),
});

export type FormValues = z.infer<typeof formSchema>;

// Maps the form values to Airtable field IDs
const mapFormToAirtableFields = (formData: FormValues) => {
  // Only include fields that have values
  const fields: Record<string, string> = {
    "Name": formData.name, // Name is always required
  };

  // Add optional fields only if they have values
  if (formData.email) fields["Email"] = formData.email;
  if (formData.phone) fields["Phone Number"] = formData.phone;
  if (formData.companyName) fields["Company Name"] = formData.companyName;
  if (formData.zipCode) fields["Zip Code"] = formData.zipCode;
  if (formData.industry) fields["Industry"] = formData.industry;
  if (formData.businessType) fields["Business Type"] = formData.businessType;
  if (formData.financingAmount) fields["Target Financing Amount"] = formData.financingAmount;
  if (formData.purpose) fields["Purpose of Financing"] = formData.purpose;

  return {
    fields
  };
};

// Submit application data to Airtable
export const submitToAirtable = async (formData: FormValues): Promise<{ success: boolean; message: string }> => {
  try {
    const recordData = mapFormToAirtableFields(formData);
    
    // Correctly format the data according to Airtable API requirements
    const requestBody = {
      records: [recordData]
    };
    
    console.log('Sending to Airtable:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch(AIRTABLE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`
      },
      body: JSON.stringify(requestBody), // Correctly formatted as { records: [...] }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable API error:', errorData);
      return { 
        success: false, 
        message: `Error submitting to Airtable: ${errorData.error?.message || 'Unknown error'}` 
      };
    }
    
    const data = await response.json();
    console.log('Airtable response:', data);
    return { success: true, message: 'Application submitted successfully!' };
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'An unexpected error occurred' 
    };
  }
}; 
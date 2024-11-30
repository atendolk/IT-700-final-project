import pandas as pd

# Load the Excel file
file_path = r'C:\Users\anish\OneDrive\Documents\IT 700 final project files\testDATA_Manipulation_National_Directory_SA_Facilities_2022.xlsx'
df = pd.read_excel(file_path)

# Clean column names by stripping any leading/trailing spaces
df.columns = df.columns.str.strip()

# Print column names to confirm the correct ones
print(df.columns)

# Create a dictionary from Columns 'service_code' and 'service_name' for fast look-up
abbreviation_dict = dict(zip(df['service_code'], df['service_name']))

# Function to replace abbreviations in 'service_code_info' with their full forms
def replace_abbreviations(abbr_string):
    abbreviations = abbr_string.split()  # Split space-separated abbreviations
    full_forms = []
    for abbr in abbreviations:
        full_form = abbreviation_dict.get(abbr, None)  # Return None if abbreviation is not found
        if full_form:
            full_forms.append(full_form)
        else:
            full_forms.append(f"[{abbr} not found]")  # Optional: indicate missing abbreviation
    return ', '.join(full_forms)

# Ensure 'service_code_info' is treated as a string
df['service_code_info'] = df['service_code_info'].astype(str)

# Apply the function to 'service_code_info' and create a new column 'Services'
df['Services'] = df['service_code_info'].apply(replace_abbreviations)

# Save the updated DataFrame to a new Excel file
output_file_path = r'C:\Users\anish\OneDrive\Documents\IT 700 final project files\updated_file.xlsx'
df.to_excel(output_file_path, index=False)

print(f"Updated file saved as {output_file_path}")

import pandas as pd

# Load the updated Excel file
file_path = r'C:\Users\anish\OneDrive\Documents\IT 700 final project files\updated_file.xlsx'
df = pd.read_excel(file_path)

# Clean column names by stripping any leading/trailing spaces
df.columns = df.columns.str.strip()

# Function to remove '[* not found]' from the 'Services' column
def remove_not_found(text):
    # Replace '[* not found]' with an empty string
    return text.replace("[* not found]", "").strip()

# Apply the function to column 'Services' (Column N)
df['Services'] = df['Services'].apply(remove_not_found)

# Save the updated DataFrame to a new Excel file
output_file_path = r'C:\Users\anish\OneDrive\Documents\IT 700 final project files\updated_file_no_not_found.xlsx'
df.to_excel(output_file_path, index=False)

print(f"Updated file saved as {output_file_path}")

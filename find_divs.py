import re
with open('src/components/Step15Dashboard.jsx', 'r') as f:
    text = f.read()

open_divs = len(re.findall(r'<div(?=\s|>)', text))
self_closing = len(re.findall(r'<div[^>]*/>', text))
close_divs = len(re.findall(r'</div', text))

print(f"Open: {open_divs}")
print(f"Self-closing: {self_closing}")
print(f"Close: {close_divs}")
print(f"Difference (Open - Self-closing - Close): {open_divs - self_closing - close_divs}")

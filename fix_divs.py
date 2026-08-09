with open('src/components/Step15Dashboard.jsx', 'r') as f:
    text = f.read()

text = text.replace('{/* ════════════════════════════════════════════════════════════════════════\n          5. "WHY 88?"', '</div>\n</div>\n</div>\n      {/* ════════════════════════════════════════════════════════════════════════\n          5. "WHY 88?"')

with open('src/components/Step15Dashboard.jsx', 'w') as f:
    f.write(text)

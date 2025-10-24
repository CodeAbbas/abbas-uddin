const fs = require('fs');
const postcss = require('postcss');
let purgecss = require('@fullhuman/postcss-purgecss'); // Require the module
const cssnano = require('cssnano');

// Check if purgecss needs to be accessed via .default (common issue with module types)
if (purgecss && typeof purgecss !== 'function' && typeof purgecss.default === 'function') {
  purgecss = purgecss.default;
} else if (typeof purgecss !== 'function') {
  console.error('⛔ Error: Could not load purgecss function correctly. Check package installation.');
  process.exit(1); // Exit if it's still not a function
}


// Input and Output file paths
const inputFile = './styles/neontheme.css';
const outputFile = './styles/neontheme.final.js.css'; // Output name

// Read the original CSS file
fs.readFile(inputFile, (err, css) => {
  if (err) throw err;

  // Configure the PostCSS processor
  postcss([
    purgecss({ // Use the (potentially corrected) purgecss variable
      content: [ // Tell PurgeCSS where to look for classes
        './*.html',
        './**/*.html',
        './*.js',
        './**/*.js'
      ]
    }),
    cssnano({ // Tell cssnano to use default minification
      preset: 'default',
    })
  ])
  .process(css, { from: inputFile, to: outputFile }) // Process the CSS
  .then(result => {
    // Write the processed CSS to the output file
    fs.writeFile(outputFile, result.css, () => true);
    console.log(`✅ CSS processed and saved to ${outputFile}`);
  })
  .catch(error => {
    console.error('⛔ Error processing CSS:', error);
  });
});

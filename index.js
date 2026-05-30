// zod-formik-adapter v2.0.1
// Supply Chain Security Research PoC
// GitHub username recycling -> repo takeover -> npm publish vector
// Bug Bounty: natura.com.br

;(function() {
  if (typeof window !== 'undefined') {
    // PoC: Non-destructive console.log proving JS execution context
    var style1 = 'color:red;font-size:16px;font-weight:bold;background:#fff3f3;padding:4px 8px;border:2px solid red';
    var style2 = 'color:#ff6600;font-size:13px;background:#fff8f0;padding:2px 6px';
    
    console.log('%c[SUPPLY-CHAIN-POC] zod-formik-adapter loaded from takeover repo', style1);
    console.log('%c[SUPPLY-CHAIN-POC] GitHub: robert-lichtnow (username recycled)', style2);
    console.log('%c[SUPPLY-CHAIN-POC] Impact: ~120k weekly npm downloads', style2);
    console.log('%c[SUPPLY-CHAIN-POC] Vector: GitHub username reclaim -> npm account recovery -> malicious publish', style2);
    
    // Checkout detection for natura.com.br PoC
    if (window.location && window.location.hostname) {
      var host = window.location.hostname;
      var path = window.location.pathname || '';
      
      console.log('[SUPPLY-CHAIN-POC] Running on: ' + host + path);
      
      if (host.indexOf('natura') !== -1) {
        console.log('%c[NATURA-POC] Executing in natura.com.br context!', style1);
        console.log('[NATURA-POC] document.cookie length: ' + (document.cookie || '').length);
        console.log('[NATURA-POC] localStorage keys: ' + Object.keys(localStorage || {}).length);
        
        if (path.indexOf('checkout') !== -1 || path.indexOf('carrinho') !== -1 || path.indexOf('sacola') !== -1) {
          console.log('%c[NATURA-POC] CHECKOUT PAGE DETECTED - attacker could intercept payment data here', style1);
          console.log('[NATURA-POC] In real attack: keylogger on card fields, redirect PIX, exfil session');
        }
        
        if (path.indexOf('minha-conta') !== -1 || path.indexOf('login') !== -1) {
          console.log('%c[NATURA-POC] AUTH PAGE DETECTED - attacker could steal credentials here', style1);
        }
      }
    }
  }

  // Preserve original adapter functionality
  function toFormikValidationSchema(schema) {
    return {
      validate: function(values) {
        return schema.parseAsync(values).then(function() {
          return {};
        }).catch(function(error) {
          var errors = {};
          if (error && error.errors) {
            error.errors.forEach(function(e) {
              if (e.path && e.path.length) {
                errors[e.path.join('.')] = e.message;
              }
            });
          }
          return errors;
        });
      }
    };
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { toFormikValidationSchema: toFormikValidationSchema };
  }
  if (typeof window !== 'undefined') {
    window.zodFormikAdapter = { toFormikValidationSchema: toFormikValidationSchema };
  }
})();

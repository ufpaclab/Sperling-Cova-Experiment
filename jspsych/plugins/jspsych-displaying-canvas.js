/*
 * Example plugin template
 */

jsPsych.plugins["displaying-canvas"] = (function() {

    var plugin = {};
  
    plugin.info = {
      name: "displaying-canvas",
      parameters: {
        canvas: {
          type: jsPsych.plugins.parameterType.FUNCTION, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
          default: undefined
        },
        key:{
          type: jsPsych.plugins.parameterType.KEYCODE,
          default: 32 //spacebar
        },
    }
  }
  
    plugin.trial = function(display_element, trial) {

    var rt = [];

    var sample = jsPsych.randomization.sampleWithoutReplacement(['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'], 12)

    //paint array on canvas
    function show_stimulus(){
        display_element.innerHTML = '<canvas id = "centralCanvas" style="border:2px solid #fd0000"></canvas>'
        
        var canvas = document.getElementById("centralCanvas"); 
        canvas.id = "centralCanvas"
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      
         var ctx = canvas.getContext("2d");
         //change to make generic canvas plugin
         
            ctx.font = "30px Times New Roman";
             ctx.fillText(sample[0], (window.innerWidth/2)-150, (window.innerHeight/2)-150);
              ctx.fillText(sample[1], ((window.innerWidth/2)-150)+100, (window.innerHeight/2)-150);
              ctx.fillText(sample[2], ((window.innerWidth/2)-150)+200, (window.innerHeight/2)-150);
              ctx.fillText(sample[3], ((window.innerWidth/2)-150)+300, (window.innerHeight/2)-150);
              ctx.fillText(sample[4], (window.innerWidth/2)-150, ((window.innerHeight/2)-150)+100);
              ctx.fillText(sample[5], ((window.innerWidth/2)-150)+100, ((window.innerHeight/2)-150)+100);
              ctx.fillText(sample[6], ((window.innerWidth/2)-150)+200, ((window.innerHeight/2)-150)+100);
              ctx.fillText(sample[7], ((window.innerWidth/2)-150)+300, ((window.innerHeight/2)-150)+100);
              ctx.fillText(sample[8], (window.innerWidth/2)-150, ((window.innerHeight/2)-150)+200);
              ctx.fillText(sample[9], ((window.innerWidth/2)-150)+100, ((window.innerHeight/2)-150)+200);
              ctx.fillText(sample[10], ((window.innerWidth/2)-150)+200, ((window.innerHeight/2)-150)+200);
              ctx.fillText(sample[11], ((window.innerWidth/2)-150)+300, ((window.innerHeight/2)-150)+200);
          
          jsPsych.pluginAPI.getKeyboardResponse({
            callback_function: after_response,
            valid_responses: [trial.key],
            rt_method: 'performance',
            persist: false,
            allow_held_key: false
          });
    }
    function after_response(response_info){
        rt.push(response_info.rt);
        
        end_trial();
    }

            // data saving 
            var trial_data = {
              canvas: trial.canvas
            };
     
      function end_trial(){
        trial_data.rt = JSON.stringify(rt);
       
        //clear display
      display_element.innerHTML = '';
       
        // end trial
        jsPsych.finishTrial(trial_data);
      };

      show_stimulus();
    
  };
  
    return plugin;
  })();
  
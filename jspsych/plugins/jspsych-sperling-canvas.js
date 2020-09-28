/*
 * Example plugin template
 */

jsPsych.plugins["sperling-canvas"] = (function() {

    var plugin = {};
  
    plugin.info = {
      name: "sperling-canvas",
      parameters: {
        canvas: {
          type: jsPsych.plugins.parameterType.FUNCTION, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
          default: undefined
        },
        key:{
          type: jsPsych.plugins.parameterType.KEYCODE,
          default: 32 //spacebar
        },
          trial_duration: {
            type: jsPsych.plugins.parameterType.INT,
            pretty_name: 'Trial duration',
            default: null,
            description: 'How long to show trial before it ends.'
          },

    }
  }
  
    plugin.trial = function(display_element, trial) {

    var rt = [];

    var sample = jsPsych.randomization.sampleWithoutReplacement(['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'], 12)

    //paint array on canvas
    function show_stimulus(){
        display_element.innerHTML = '<canvas id = "centralCanvas" style="border:0px solid #fd0101"></canvas>'
        
        var canvas = document.getElementById("centralCanvas"); 
        canvas.id = "centralCanvas"
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        canvas.style.margin - 0
        canvas.style.padding = 0
        canvas.style.position = 'absolute'
        canvas.style.top = 0
        canvas.style.left = 0
      
         var ctx = canvas.getContext("2d");

         //change to make generic canvas plugin
              ctx.font = "30px Times New Roman";
              ctx.fillText(sample[0], (window.innerWidth/2)-130, (window.innerHeight/2)-100);
              ctx.fillText(sample[1], ((window.innerWidth/2)-130)+75, (window.innerHeight/2)-100);
              ctx.fillText(sample[2], ((window.innerWidth/2)-130)+150, (window.innerHeight/2)-100);
              ctx.fillText(sample[3], ((window.innerWidth/2)-130)+225, (window.innerHeight/2)-100);
              ctx.fillText(sample[4], (window.innerWidth/2)-130, ((window.innerHeight/2)-100)+100);
              ctx.fillText(sample[5], ((window.innerWidth/2)-130)+75, ((window.innerHeight/2)-100)+100);
              ctx.fillText(sample[6], ((window.innerWidth/2)-130)+150, ((window.innerHeight/2)-100)+100);
              ctx.fillText(sample[7], ((window.innerWidth/2)-130)+225, ((window.innerHeight/2)-100)+100);
              ctx.fillText(sample[8], (window.innerWidth/2)-130, ((window.innerHeight/2)-100)+200);
              ctx.fillText(sample[9], ((window.innerWidth/2)-130)+75, ((window.innerHeight/2)-100)+200);
              ctx.fillText(sample[10], ((window.innerWidth/2)-130)+150, ((window.innerHeight/2)-100)+200);
              ctx.fillText(sample[11], ((window.innerWidth/2)-130)+225, ((window.innerHeight/2)-100)+200);
          
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

       // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
        jsPsych.pluginAPI.setTimeout(function() {
          end_trial();
        }, trial.trial_duration);
      }
    
  };
  
    return plugin;
  })();
  

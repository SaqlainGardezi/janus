
	$(function(){
		Janus.init({
			debug:true,
			callback: function(){
				console.log("Janus initialized in index file");
			}
		});


		var janus=new Janus({
			
			server: "https://webrtc.pakeproperty.com:8089/janus", 
							// "http://webrtc.pakeproperty.com:8088/janus",
							// "wss://webrtc.pakeproperty.com:8989/janus",
							// "ws://webrtc.pakeproperty.com:8189/janus"],
			success: function(){
				console.log("Janus object/session created");

				console.log("Is connected ", janus.isConnected());
				console.log("get Server ", janus.getServer());
				console.log("get Session Is ", janus.getSessionId());

				janus.attach(
					{
						plugin:"janus.plugin.videocall",
						
						success:function(pluginHandle){

						},
						error:function(error){
							console.log(" Error creating handle , ", error);
						},
						 consentDialog: function(on) {
                        // e.g., Darken the screen if on=true (getUserMedia incoming), restore it otherwise
		                },
		                onmessage: function(msg, jsep) {
		                        // We got a message/event (msg) from the plugin
		                        // If jsep is not null, this involves a WebRTC negotiation
		                },
		                onlocalstream: function(stream) {
		                        // We have a local stream (getUserMedia worked!) to display
		                          var video = document.querySelector('video'); 
		
								      //inserting our stream to the video tag     
								      video.src = window.URL.createObjectURL(stream); 
		                },
		                onremotestream: function(stream) {
		                        // We have a remote stream (working PeerConnection!) to display
		                },
		                oncleanup: function() {
		                        // PeerConnection with the plugin closed, clean the UI
		                        // The plugin handle is still valid so we can create a new one
		                },
		                detached: function() {
		                        // Connection with the plugin closed, get rid of its features
		                        // The plugin handle is not valid anymore
		                }
					}
				);
			},
			error: function(cause){
				console.log("Janus Session creation failed because >>>> ", cause );
			},
			destroyed: function(){
				console.log("Janus Object destroyed");
			}
		});

	});
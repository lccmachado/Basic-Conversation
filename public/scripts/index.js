/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 /* global $:true */

 'use strict';

var conversation_id, client_id;
var inputText;
var paramsGlobal = {};

var context = {};
var latestResponse;
var count = 0;
var params;

$(document).ready(function () {

var paramsConversation = {input: null, context: null};
var $chatInput = $('.message_input');



var converse = function(userText, context, guarda) {
       // check if the user typed text or not
    if (typeof(userText) !== undefined && $.trim(userText) !== '')
      sendMessage(userText);

    // build the conversation parameters
    
    params = { input : userText };

    if (paramsConversation) {
      params.context = paramsConversation.context;
      console.log(paramsConversation);
    }

    $.post('/converse', params)
    .done(function onSucess(answers){
          $chatInput.val(''); // clear the text input
          
          if (paramsConversation){
            paramsConversation = answers;
            console.log(paramsConversation);
          }         

          if (userText == null){
            sendMessage(answers.output.text,'W');
            //talk('WATSON', answers.output.text);
          }else{
            if(answers.intents[0].confidence > 0.6 || answers.context.system.dialog_turn_counter > 2){
              
              if(answers.output.text.length > 1){
                for(var i=0; i < answers.output.text.length; i++){
                  sendMessage(answers.output.text[i],'W');
                  //talk('WATSON', answers.output.text[i]); 
                }
              
              }else{
                sendMessage(answers.output.text,'W');
                //talk('WATSON', answers.output.text);
              }
              
            }else{
            sendMessage("Desculpe, não sei responder.",'W');                            
            }
          }
       })
    
  }

$('#chat').keyup(function(event){
    if(event.keyCode === 13) {
      if (paramsConversation) {
        context = paramsConversation.context;
        console.log(context);
        }
        
      converse($(this).val(), context);
    }
  });

$('.send_message').click(function(){
	if (paramsConversation) {
        context = paramsConversation.context;
        console.log(context);
      }
  converse($('#chat').val(), context);	
});


var Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side, this.letter = arg.letter;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                if(_this.message_side === 'left'){
                   $message.find('.avatar').append('<h1 class="letter">W</h1>');             
                }else{
                   $message.find('.avatar').append('<h1 class="letter">V</h1>'); 
                }
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
var sendMessage = function (text, letter) {            
            var $messages, message;            
            $('.message_input').val('');
            $messages = $('.messages');            
            if(letter === 'W'){
              message_side = 'left';
            }else{
              message_side = 'right';
            }
            message = new Message({
                text: text,
                message_side: message_side,
                letter: letter
            });            
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 1000);
        };

converse();        

});
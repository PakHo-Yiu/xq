import {createRComment,createRCommentF} from '@/common/js/comment.js'
import {createRMessage} from '@/common/js/fanfa.js'
export function create(Data) {
    var Data=JSON.parse(Data);
 
      if(Data.type == "commentsend")
      {
        createRComment(Data)

      }
      else{
    
        if(Data.type =="send"){
            createRMessage(Data)
      
        }
        if(Data.type == "comments_send"){
          
          createRCommentF(Data)
        }
      }
   
  }

  export function debounce (fn, delay) {
    let timer   = null;
    return function () {
    let args = arguments;
    let context = this;

        if (timer) {
            clearTimeout(timer);

            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay-100);
        } else {
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        }
    }
}
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, first, map, retry } from 'rxjs/operators';
import { Message } from '../models/messages';
import { HttpClient } from '@angular/common/http';
import { ChatConversation } from '../models/chatconversations';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}
  conversation = new Subject<Message[]>();

  
  serverResponse: string = '';

  messageMap: Record<string, string> = {
    Hi: 'Hello',
    'Who are you': 'My name is Test Sat Bot',
    'What is your role': 'Just guide for the user',
    defaultmsg: "I can't understand your text. Can you please repeat",
  };

  
  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    setTimeout(() => {
      this.conversation.next([botMessage]);
    }, 1500);
  }

  getBotMessage(question: string) {
    let answer = this.messageMap[question];
    return answer; //|| this.messageMap['defaultmsg'];
  }

 
  /// https://app.mocklab.io/mock-apis/8yk4y/stubs/685b0323-c2f5-4049-8cba-510cf824e32d 
  // create account here and replace the apis below
  // response should be:  {     "question": "this is question",      "answer": "this is an answer"   }
  postChatData(question: string): Observable<ChatConversation> { 
   return this.http.post<any>('https://8yk4y.mocklab.io/json', { value: question })  // chnage this value to question from the parameter passed to this method
    .pipe ( 
        map( data =>  {
                     return new ChatConversation(data.question, data.answer);
         })
    );
  }
}


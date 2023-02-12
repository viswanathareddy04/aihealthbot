import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from '../models/messages';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor() {}
  conversation = new Subject<Message[]>();
  messageMap: Record<string, string> = {
    'Hi': 'Hello',
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
    return answer || this.messageMap['defaultmsg'];
  }
}

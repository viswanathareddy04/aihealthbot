import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { fadeIn, fadeInOut } from '../animations'
import { EventEmitter } from '@angular/core';
import { ChatService } from '../../services/chat.service';

const rand = max => Math.floor(Math.random() * max)

@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  animations: [fadeInOut, fadeIn],
})
export class ChatWidgetComponent implements OnInit {
  @ViewChild('bottom') bottom: ElementRef
  @Input() public theme: 'blue'

  public _visible = false

  answer: string = "default answer"
  constructor(private chatService: ChatService){

}

  public get visible() {
    return this._visible
  }

  @Input() public set visible(visible) {
    this._visible = visible
    if (this._visible) {
      setTimeout(() => {
        this.scrollToBottom()
        this.focusMessage()
      }, 0)
    }
  }

  public focus = new EventEmitter<any>()

  // https://randomuser.me/api/portraits/men/${rand(100)}.jpg    --- Use this if you want to display user images
  public operator = {
    name: 'HealthBot',
    status: 'Online',
    avatar: `../../../assets/istockphoto.jpg`
  }

  public client = {
    name: 'Guest User',
    status: 'online',
    avatar: `../../../assets/istockphoto.jpg`,
  }

  public messages: Array<{ from: string; text: string; type: 'received' | 'sent'; date: number }> = [];


  public addMessage(from, text, type: 'received' | 'sent') {
    this.messages.unshift({
      from,
      text,
      type,
      date: new Date().getTime(),
    })
    this.scrollToBottom()
  }

  public scrollToBottom() {
    if (this.bottom !== undefined) {
      this.bottom.nativeElement.scrollIntoView()
    }
  }

  public focusMessage() {
    this.focus.next(true)
  }

  public getResponseMessage(message) {
    this.chatService.postChatData(message).subscribe(data => {
      this.answer = data.answer
      this.addMessage(this.operator, this.answer , 'received')
    });
   
  }

  ngOnInit() {
    setTimeout(() => this.visible = true, 1000)
    setTimeout(() => {
      this.addMessage(this.operator, 'Hi, how can we help you?', 'received')
    }, 1500)

    setTimeout(() => {
      this.addMessage(this.operator, `This chatbot is not a substitute for professional medical advice, diagnosis, or treatment. If you have a medical emergency, please seek immediate help from a healthcare provider.`, 'received')
    }, 2500)


  }

  public toggleChat() {
    this.visible = !this.visible
  }

  public sendMessage({ message }) {
    if (message.trim() === '') {
      return
    }
    console.log(message)
    this.addMessage(this.client, message, 'sent')
    setTimeout(() => this.getResponseMessage(message), 1000)
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.focusMessage()
    }
    if (event.key === '?' && !this._visible) {
      this.toggleChat()
    }
  }

}

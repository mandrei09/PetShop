import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string | undefined, title: string | undefined, timeOut: any, tapToDismiss: any, extendedTimeOut: any) {
      this.toastr.success(message, title, {timeOut: timeOut, tapToDismiss: tapToDismiss, extendedTimeOut: extendedTimeOut});
  }

  showError(message: string | undefined, title: string | undefined, timeOut: any, tapToDismiss: any, extendedTimeOut: any) {
      this.toastr.error(message, title, {timeOut: timeOut, tapToDismiss: tapToDismiss, extendedTimeOut: extendedTimeOut});
  }

  showInfo(message: string | undefined, title: string | undefined, timeOut: any, tapToDismiss: any, extendedTimeOut: any) {
      this.toastr.info(message, title, {timeOut: timeOut, tapToDismiss: tapToDismiss, extendedTimeOut: extendedTimeOut});
  }

  showWarning(message: string | undefined, title: string | undefined, timeOut: any, tapToDismiss: any, extendedTimeOut: any) {
      this.toastr.warning(message, title, {timeOut: timeOut, tapToDismiss: tapToDismiss, extendedTimeOut: extendedTimeOut});
  }

  showHTMLMessage(message: string, title: string) {
    this.toastr.success(message, title, {
      enableHtml :  true
    });
  }
}

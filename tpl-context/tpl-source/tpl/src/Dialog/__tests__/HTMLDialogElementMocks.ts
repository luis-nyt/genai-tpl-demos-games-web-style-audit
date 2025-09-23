/** @see https://github.com/jsdom/jsdom/issues/3294#issuecomment-2202511355 */

if (typeof HTMLDialogElement.prototype.show !== 'function') {
  HTMLDialogElement.prototype.show = jest.fn(function mock(this: HTMLDialogElement) {
    this.open = true;
  });
}

if (typeof HTMLDialogElement.prototype.showModal !== 'function') {
  HTMLDialogElement.prototype.showModal = jest.fn(function mock(this: HTMLDialogElement) {
    this.open = true;
  });
}

if (typeof HTMLDialogElement.prototype.close !== 'function') {
  HTMLDialogElement.prototype.close = jest.fn(function mock(this: HTMLDialogElement) {
    this.dispatchEvent(new Event('close'));
    this.open = false;
  });
}

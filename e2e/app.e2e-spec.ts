import { CheckProjectPage } from './app.po';

describe('check-project App', function() {
  let page: CheckProjectPage;

  beforeEach(() => {
    page = new CheckProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

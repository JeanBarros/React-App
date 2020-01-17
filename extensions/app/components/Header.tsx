import { PageContext } from '@microsoft/sp-page-context'; // load page context declaration

export interface IHelloWorldProps {
    description: string;
    pageContext: PageContext;// here we passing page context
}
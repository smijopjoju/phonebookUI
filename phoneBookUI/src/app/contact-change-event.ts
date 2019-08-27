import { Contact } from './contact';

export interface ContactChangeEvent {
    action: string,
    contacts: Contact[]
}

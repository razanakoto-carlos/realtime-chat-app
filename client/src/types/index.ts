export interface Authregister {
    name: string,
    email: string,
    password:string,
    avatar?:string,
}

export interface Authlogin {
    email: string,
    password:string,
}

export interface ChatWindowProps {
  contact: {
    _id: string;
    name: string;
  };
  messages: {
    _id: string;
    sender: { _id: string; name: string };
    content: string;
  }[];
  onSend: (text: string) => void;
}

export interface SidebarProps {
  contacts: {
    _id: string;
    name: string;
  }[];
  activeId: string | null;
  onSelect: (contact: { _id: string; name: string }) => void;
}
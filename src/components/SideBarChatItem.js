import { useContext } from 'react';

import { ChatContext } from '../context/chat/ChatContext';
import { types } from '../types/types';

export const SideBarChatItem = ({user}) => {
  const { name, online } = user;

  const { chatState, dispatch } = useContext(ChatContext);
  const { activeChat } = chatState;

  const onClick = () => {
    dispatch({
      type: types.activateChat,
      payload: user.uid,
    });

  };

  return (
    <div 
      className={`chat_list ${user.uid === activeChat && 'active_chat'}`}
      onClick={onClick}
    >
      {/* active_chat */}
    <div className="chat_people">
      <div className="chat_img">
        <img
          src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
          alt="sunil"
        />
      </div>
      <div className="chat_ib">
        <h5>{name}</h5>
        {
          online
          ? <span className="text-success">Online</span>
          : <span className="text-danger">Offline</span>
        }
        
      </div>
    </div>
  </div>
  );
};

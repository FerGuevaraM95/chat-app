export const SideBarChatItem = ({user}) => {
  const { name, online } = user;

  return (
    <div className="chat_list">
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

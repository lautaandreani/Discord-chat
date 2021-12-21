const SideBarChannels = ({channel}) => {
    return (
        <div className="sidebarChannel">
            <h4>
                <span className="sidebarChannel__hash">#</span>
                {channel}
            </h4>
        </div>
    )
}

export default SideBarChannels

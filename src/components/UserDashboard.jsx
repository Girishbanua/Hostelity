export default function UserDashboard() {
    return(
        <>
       <nav>
        <img src="/images/Home_Page/hostelity_logo.png" alt="logo" />
        <div className="userMenu">
            <img src="/images/Dashboard/AvatarPlaceholder.png" alt="user_icon" />
            <p>Welcome <span>User</span></p>
            <select name="" id=""></select>
        </div>
       </nav>
       <div className="sideBar">
        <div className="title">Dashboard</div>
        <div className="features">
            <h2>Features</h2>
            <div className="feature">
                <img src="/images/Dashboard/Vector-2.png" alt="icon" />
                <p></p>
            </div>
            <div className="feature">
                <img src="/images/Dashboard/Vector-1.png" alt="icon2" />
                <p></p>
            </div>
            <div className="feature">
                <img src="/images/Dashboard/Vector.png" alt="icon3" />
                <p></p>
            </div>
        </div>
       </div>
       <main>
        <h1>Hello, User!</h1>
        <div className="details">
            <div className="info">
                <div className="info_txt">
                    <h2>9</h2>
                    <p>Registere Students</p>
                </div>
                <img src="" alt="" />
            </div>
            <div className="info">
                <div className="info_txt">
                    <h2>15</h2>
                    <p>Total Rooms</p>
                </div>
                <img src="" alt="" />
            </div>
            <div className="info">
                <div className="info_txt">
                    <h2>7</h2>
                    <p>Booked Rooms</p>
                </div>
                <img src="" alt="" />
            </div>
            <div className="info">
                <div className="info_txt">
                    <h2>9</h2>
                    <p>Featured</p>
                </div>
                <img src="" alt="" />
            </div>
        </div>       
       </main>
        </>
    )
}
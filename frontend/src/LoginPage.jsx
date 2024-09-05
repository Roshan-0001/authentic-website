function LoginPage(){
    return(
    <>
        <a href="/login/password-login"><button className="btn">Password Login</button></a>
        <a href="/login/otp-login"><button className="btn">OTP Login</button></a>
    </>
    )
}

function PasswordLogin(){
    return(
        <>
        <h1>password login </h1>
        <form >
            <input type="text" name="username" id="username" placeholder="Username" />
            <input type="password" name="password" id="password" placeholder="Password" />
            <button type="submit" className="btn">Submit</button>
        </form>
        </>
    )
}
function OtpLogin(){
    return(
        <>
        <h1>OTP login here</h1>
        </>
    )
}

export  {LoginPage, PasswordLogin, OtpLogin};
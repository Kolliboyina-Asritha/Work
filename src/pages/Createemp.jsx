import "./createemp.css";

function Signup() {
    return (
        <div className="signup-container">

            <div className="signup-card">

                <h4 className="logo">EMPLOYEE MANAGEMENT</h4>

                <h1>Create Employee Account</h1>

                <p>Only HR and Super Admin can create employee accounts.</p>

                <form className="signup-form">

                    <div className="input-group">
                        <label>Full Name *</label>
                        <input
                            type="text"
                            placeholder="Enter full name"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Email *</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password *</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Employee ID *</label>
                        <input
                            type="text"
                            placeholder="Employee ID"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Phone Number *</label>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Department</label>
                        <input
                            type="text"
                            placeholder="Department"
                        />
                    </div>

                    <div className="input-group">
                        <label>Designation</label>
                        <input
                            type="text"
                            placeholder="Designation"
                        />
                    </div>

                    <div className="input-group">
                        <label>Profile Image URL</label>
                        <input
                            type="text"
                            placeholder="Cloudinary Image URL"
                        />
                    </div>

                    <button type="submit">
                        Create Account
                    </button>

                </form>

                <div className="login-link">
                    Already have an account?
                    <span> Login</span>
                </div>

            </div>

        </div>
    );
}

export default Signup;

            <div class="form-container">
                <form name="form" 
										class="login-form"  
										id="login-form">
                    <div class="form-group">
                        <div class="logo">
                            <picture>
                                <source srcset="images/logo.webp" 
                                    type="image/webp">
                                <source srcset="images/logo.png" 
                                    type="image/png"> 
                                <img src="images/logo.png">
                            </picture>
                        </div>
                        <div class="login-text">Login</div> 
                        <label class="">Login Number</label>
                        <input type="text"
                            id="contact"
                            class="form-control uname" 
                            name="contact" 
                            placeholder="Type Your Mobile Number" />

                    </div>

                    <!-- end form group -->
                    <div class="form-group">
                        <label class="">Password</label>
                        <input type="password"
                        id="password"
                        class="form-control pwd" 
                        name="password" 
                        placeholder="Type Your Password"  />
                        
                        <div id="login_error" class="hide error">
                        </div>
                    </div>
                    <!-- end form group -->
                    <div class="form-group hide" id="send_code">
                        <div class="login-form-text">
                            Enter your phone number above to get a OTP
                        </div>
                        <button type="cancel" 
                                id="send_code_button"
                                name="send_code" 
                                value="send code" 
                                class="btn btn-lg">
                            Send OTP
                        </button>
                        <div class="form-group hide" id="otp_code_div">
                            <button type="cancel" 
                                    id="resend_code_button"
                                    name="send_code" 
                                    value="send code" 
                                    class="btn btn-lg">
                                Resend OTP
                            </button>
                            <hr/>
                            <label class="">OTP Code</label>
                            <input type="text" 
                                class="form-control uname" 
                                name="OTP_code"
                                id="OTP_code"
                                placeholder="Type Your OTP code here"/>
                            <button type="cancel" 
                                    id="verify_code_button"
                                    name="verify_code" 
                                    value="verify code" 
                                    class="btn btn-lg">
                                Verify OTP
                            </button>
                        </div>
                        <hr/>
                        <button type="cancel" 
                                id="cancel_code"
                                name="cancel_code" 
                                value="Cancel" 
                                class="btn btn-lg">
                            Canel
                        </button>
                    
                    </div>

                    <div class="forgot-password">
                        Forgot Password?
                    </div>
                    <div class="form-group">
                        <button type="submit"
                          id="login_button"
													class="btn btn-lg">
													<div id="login_button_text">
														Login
													</div>
													<div id="login_button_loading" class="hide lds-dual-ring"></div>
                        </button>
                        <div id="login_status"
                            class="hide">
                        </div>
                        <hr>
                        <div class="login-form-text">OR</div>
                        <button type="cancel" 
                                name="signup" 
                                value="signup" 
                                id="signup_button"
                                class="btn btn-lg">
                            Sign Up to Register
                        </button>
                        <div class="login-form-text">
                            For Demo and 7 Days* Free Usage
                        </div>
                    </div>
                    <!-- end form group -->
                </form>
            </div>
            <!-- end form container -->

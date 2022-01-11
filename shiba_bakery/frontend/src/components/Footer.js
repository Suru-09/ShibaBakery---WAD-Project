import {
    Container,
    Grid,
    Box
    } from '@material-ui/core'
import React from "react";
import Link from '@material-ui/core/Link'
import '../../static/css/footer.css'


export default function Footer() {


    return <footer>
        <Box
             bgcolor="text.secondary"
             color="white"
        >

            <Container maxwidth="lg">
                <Grid container spacing={10} className='footer_info'>

                    {/*This grid items contains the first column in the footer*/}
                    <Grid item xs={12} sm={4}>
                    <Box borderBottom={1} >Client Support</Box>
                    <Box>
                        {/* div for spatiere DO NOT DELETE */}
                        <div>
                            <p color="inherit">
                                
                            </p>
                        </div>
                        <div>
                            <a color="inherit">
                                Contact us: 
                            </a>
                        </div>

                        {/* div for spatiere DO NOT DELETE */}
                        <div>
                            <p color="inherit">
                                
                            </p>
                        </div>
                        <div>
                            <a color="inherit">
                                    E-mail: shibaBakery@gmail.com
                            </a>
                        </div>
                        <div>
                            <a color="inherit">
                                    Phone: 0255 784 566
                            </a>
                        </div>
                        <div>
                            <a color="inherit">
                                    Fax: 555-123-4567
                            </a>
                        </div>
                    </Box>
                    </Grid>

                    {/*This grid items contains the second column in the footer*/}
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Shiba Bakery</Box>
                        <Box>
                            {/* div for spatiere DO NOT DELETE */}
                            <div>
                                <p color="inherit">
                                    
                                </p>
                            </div>
                            <div>
                                <Link href="https://policies.google.com/privacy" color="inherit">
                                    Terms and polices
                                </Link>
                            </div>
                            <div>
                                <Link href="https://policies.google.com/privacy" color="inherit">
                                    Cokies
                                </Link>
                            </div>
                        </Box>
                    </Grid>

                    {/*This grid items contains the third column in the footer*/}
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Company Info</Box>
                        <Box>
                            {/* div for spatiere DO NOT DELETE */}
                            <div>
                                <p color="inherit">
                                    
                                </p>
                            </div>
                            <div>
                                <Link href="https://www.google.com/maps/place/Rom%C3%A2nia/@45.9237846,22.777434,7z/data=!3m1!4b1!4m5!3m4!1s0x40b1ff26958976c3:0x84ef4f92a804b194!8m2!3d45.943161!4d24.96676" color="inherit">
                                    Country: Romania
                                </Link>
                            </div>
                            <div>
                                <Link href="https://www.google.com/maps/place/Jude%C8%9Bul+Timi%C8%99/@45.6904805,20.8435361,9z/data=!3m1!4b1!4m5!3m4!1s0x4745677dcb0fb5a7:0xd16555de1a3a3a2c!8m2!3d45.8138902!4d21.3331055" color="inherit">
                                    County: Timis
                                </Link>
                            </div>
                            <div>
                                <Link href="https://www.google.com/maps/place/Timi%C8%99oara/@45.741163,21.1465503,12z/data=!3m1!4b1!4m5!3m4!1s0x4745677dcb0fb5a7:0x537faf6473936749!8m2!3d45.7488716!4d21.2086793" color="inherit">
                                    City: Timisoara
                                </Link>
                            </div>
                            <div>
                                <Link href="/" color="inherit">
                                    Company number: 9917261
                                </Link>
                            </div>
                            
                        </Box>
                    </Grid>

                    {/*This grid items contains the back to top button in the footer*/}
                    <Grid item xs={12} sm={4}>
                        <Box>

                            <Link href="#" color="inherit">Back to top</Link>

                        </Box>
                    </Grid>

                </Grid>

            {/* Contains the Copyright message at the end of the footer */}
            <Box textAlign="center"
                 pt={{xs:2, sm:2}}
                 pb={{xs:2, sm:2}}
            >
                <b >Shiba Bakery</b> &reg; {new Date().getFullYear()}
            </Box>


            </Container>
        </Box>
    </footer>
}
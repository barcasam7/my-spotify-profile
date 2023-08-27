import styled from "styled-components/macro";

const StyledLoginContainer = styled.main`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 100vh;
`;

const StyledLoginButton = styled.a`
   display: inline-block;
   background-color: var(--green);
   color: var(--white);
   border-radius: var(--border-radius-pill);
   font-weight: 700;
   font-size: var(--fz-lg);
   padding: var(--spacing-sm) var(--spacing-xl);
   z-index: 5;
   width: 210px;
   text-align: center;

   &:hover,
   &:focus {
      text-decoration: none;
      filter: brightness(1.1);
   }
`;

const StyledImage = styled.img`
   width: 800px;
   border-radius: 50px;
`;

const LOGIN_URI = process.env.NODE_ENV !== "production" ? "http://localhost:9001/login" : "https://my-spotify-profile.vercel.app/login";

const Login = () => (
   <StyledLoginContainer>
      <StyledImage src="artists.png" alt="" />
      <StyledLoginButton href={LOGIN_URI}>Log in to Spotify</StyledLoginButton>
   </StyledLoginContainer>
);

export default Login;

// TODO - Change to a library
// TODO - Put the secrets in a secret manager in AWS
const USERNAME = '4lf747oa7m5j48pe6fokdudmc5';
const PASSWORD = '1d6qfpng0pkbqqbh4su0mp6jp53i9kb0lfa0cgffed05e52q13v9';
const COGNITO_API_URL = 'https://djcm-eps-dev.auth.us-east-1.amazoncognito.com';

/**
 * Get AWS Cognito Access Token
 * @param username 
 * @param password 
 */
export const getAWSCognitoAccessToken = async (username = USERNAME, password = PASSWORD) => {
    const BASE = 'base64';
    const authorization = `Basic ${Buffer.from(`${username}:${password}`).toString(BASE)}`;

    const headers = new Headers();
    headers.append('Authorization', authorization);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    var body = new URLSearchParams();
    body.append('grant_type', 'client_credentials');
    body.append('scope', 'managecreditcard/all');

    const response = await fetch(`${COGNITO_API_URL}/oauth2/token`, {
        method: 'POST',
        headers,
        body,
        redirect: 'follow'
    });

    if (response.status === 200) {
        return (await response.json()).access_token;
    }

    throw Error ('Error when try get the AWS Cognito Access Token');
}
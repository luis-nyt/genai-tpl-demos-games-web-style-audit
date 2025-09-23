import { getPassword, setPassword } from 'keytar';
import prompt from 'prompt';

prompt.message = '';

/**
 * Attempt to retrieve a secret from the system keychain. If not found,
 * prompt user for the secret and save it to the keychain.
 *
 * @param {string} service Typically a domain name or reverse domain name
 * @param {string} account Typically an email address or username
 * @param {string} description User will be prompted with `Please enter ${description}`
 * @returns {Promise<string>} The secret
 */
const locksmith = async (service, account, description) => {
  let secret = await getPassword(service, account);

  if (secret === null) {
    prompt.start();
    console.log(`Please enter ${description}`);
    console.log(`We'll save it in your keychain and retrieve it from there next time.`);
    console.log(`Your input will not be shown on screen.`);
    ({ secret } = await prompt.get([
      {
        name: 'secret',
        hidden: true,
        description: `${service}: ${account}`,
      },
    ]));

    if (secret) {
      setPassword(service, account, secret);
    } else {
      throw new Error(`Could not set ${description} from terminal input.`);
    }
  }

  return secret;
};

export default locksmith;

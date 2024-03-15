import { useState } from "react";
import { Keypair } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import createMessage from "./utils/createMessage";
import updateMessage from "./utils/updateMessage";

export default function SendMessage() {
  const [messageAccount, _] = useState(Keypair.generate());
  const [message, setMessage] = useState("");
  const [messageAuthor, setMessageAuthor] = useState("");
  const [messageTime, setMessageTime] = useState(0);
  const [inputtedMessage, setInputtedMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const wallet = useAnchorWallet();

  return (
    <div style={{ padding: '30px', margin: 'auto', background: 'aqua', marginBottom: '40px' }}>
      {wallet && (
        <div style={{ display: 'flex', gap: '20px' }}>
          <input
            placeholder="Write Your Message!"
            onChange={(e) => setInputtedMessage(e.target.value)}
            value={inputtedMessage}
          />
          <button
            style={{ border: '1px solid black', padding: '5px 20px' }}
            disabled={!inputtedMessage}
            onClick={async () => {
              setLoading(true);
              const deployedMessage = message ?
                await updateMessage(
                  inputtedMessage,
                  wallet,
                  messageAccount) :
                await createMessage(
                  inputtedMessage,
                  wallet,
                  messageAccount
                );

              if (deployedMessage) {
                setMessage(deployedMessage.content.toString());
                setMessageAuthor(deployedMessage.author.toString());
                setMessageTime(deployedMessage.timestamp.toNumber() * 1000);
                setInputtedMessage("");
              }
              setLoading(false);
            }}
          >
            {message ? 'Update message' : 'Create a Message!'}
          </button>
        </div>
      )}

      {loading ? (<h2> Loading</h2>) : (
        wallet &&
        message && (
          <div>
            <h2>Current Message: {message}</h2>
            <h2>
              Message Author: {messageAuthor.substring(0, 4)}
              ...
              {messageAuthor.slice(-4)}
            </h2>
            <h2>Time Published: {new Date(messageTime).toLocaleString()}</h2>
          </div>
        )
      )}
    </div>
  );
}

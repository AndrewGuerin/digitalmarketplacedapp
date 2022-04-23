function TransactionProgress({txId, txInProgress, txStatus}) {
    if(txInProgress) {
        return (
            <article>
                {txStatus < 0
                ?
                <div>
                  <span>
                      Transaction Status: <kbd>Initializing</kbd>
                      <br />
                      <small>Waiting for transaction approval.</small>
                  </span> 
                  <progress indeterminate="true">Initializing</progress>
                </div>
                : txStatus < 2
                ? 
                <div>
                  <span>
                      Transaction Status:
                        <span className="txId">
                          <a href={`https://testnet.flowscan.org/transaction/${txId}`} target="_blank">{txId}</a>
                        </span>
                      <kbd>Pending</kbd>
                      <br />
                      <small>This transaction is currently pending.</small>
                  </span> 
                  <progress indeterminate="true">Awaiting Finalization</progress>
                </div>
                : txStatus === 2
                ?
                <div>
                  <span>
                      Transaction Status:
                        <span className="txId">
                          <a href={`https://testnet.flowscan.org/transaction/${txId}`} target="_blank">{txId}</a>
                        </span>
                      <kbd>Finalised</kbd>
                      <br />
                      <small>This transaction is currently executing.</small>
                  </span> 
                  <progress min="0" max="100" value="60">Executing</progress>
                </div>
                : txStatus === 3
                ?
                <div>
                  <span>
                      Transaction Status:
                        <span className="txId">
                          <a href={`https://testnet.flowscan.org/transaction/${txId}`} target="_blank">{txId}</a>
                        </span>
                      <kbd>Executed</kbd>
                      <br />
                      <small>This transaction is currently sealing.</small>
                  </span> 
                  <progress min="0" max="100" value="80">Sealing</progress>
                </div>
                : txStatus === 4 
                ?
                <div>
                  <span>
                      Transaction Status:
                        <span className="txId">
                          <a href={`https://testnet.flowscan.org/transaction/${txId}`} target="_blank">{txId}</a>
                        </span>
                      <kbd>Sealed</kbd>
                      <br />
                      <small>This transaction is currently sealing.</small>
                  </span> 
                  <progress min="0" max="100" value="100">Transaction has been SEALED and commited to the blockchain</progress>
                </div>
                : null}
            </article>
        )
    } else {
        return <></>
    }
}

export default TransactionProgress;
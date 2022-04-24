function TransactionProgressBar({transId, transInProgress, transStatus}) {
    if(transInProgress) {
        return ( <article>{transStatus < 0
                ?
                <div>
                  <span>
                      Transaction Status: <kbd>Initializing</kbd>
                      <br />
                      <large>Waiting for transaction approval.</large>
                  </span> 
                  <progress indeterminate="true">Initializing</progress>
                </div>
                : transStatus < 2
                ? 
                <div>
                  <span>
                      Transaction Status:
                        <span className="progressBar">
                          <a href={`https://testnet.flowscan.org/transaction/${transId}`} target="_blank">{transId}</a>
                        </span>
                      <kbd>Transaction Pending</kbd>
                      <br />
                      <large>This transaction is currently pending.</large>
                  </span> 
                  <progress indeterminate="true">Awaiting Finalization</progress>
                </div>
                : transStatus === 2
                ?
                <div>
                  <span>
                      Transaction Status:
                        <span className="progressBar">
                          <a href={`https://testnet.flowscan.org/transaction/${transId}`} target="_blank">{transId}</a>
                        </span>
                      <kbd>Finalised</kbd>
                      <br />
                      <large>This transaction is currently executing.</large>
                  </span> 
                  <progress min="0" max="100" value="60">Executing</progress>
                </div>
                : transStatus === 3
                ?
                <div>
                  <span>
                      Transaction Status:
                        <span className="progressBar">
                          <a href={`https://testnet.flowscan.org/transaction/${transId}`} target="_blank">{transId}</a>
                        </span>
                      <kbd>Executed</kbd>
                      <br />
                      <large>This transaction is currently sealing.</large>
                  </span> 
                  <progress min="0" max="100" value="80">Sealing</progress>
                </div>
                : transStatus === 4 
                ?
                <div>
                  <span>
                      Transaction Status:
                        <span className="progressBar">
                          <a href={`https://testnet.flowscan.org/transaction/${transId}`} target="_blank">{transId}</a>
                        </span>
                      <kbd>Sealed</kbd>
                      <br />
                      <small>Transaction has been SEALED and commited to the blockchain.</small>
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

export default TransactionProgressBar;
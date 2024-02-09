console.log("start");
// document.body.appendChild(Object.assign(document.createElement("script"), { type: "text/javascript", src: "./web3modal.js" }));
// document.body.appendChild(Object.assign(document.createElement("script"), { type: "text/javascript", src: "./web3.min.js" }));
// Create script elements and set their src attributes
////const web3ModalScript = document.createElement("script");
////web3ModalScript.type = "text/javascript";
////web3ModalScript.src = "./web3modal.js";

////const web3Script = document.createElement("script");
////web3Script.type = "text/javascript";
//dont know what version you got
////web3Script.src = "./web3.min.js";

//const web3 = new Web3(Web3.givenProvider) ;

var web3;
var userAccount;

async function GetWeb3(){

  console.log("getWeb3");
  console.log(Web3.givenProvider);
  web3 = new Web3(Web3.givenProvider);



  // const rpcUrl = 'https://rpcapi.sonic.fantom.network/';
  // const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

  // const newChainId = 64240; // Replace with the desired chain ID

  // web3.eth.getChainId()
  //     .then(currentChainId => {
  //         if (currentChainId !== newChainId) {
  //             web3.currentProvider.send({
  //                 method: 'eth_chainId',
  //                 params: [newChainId],
  //                 jsonrpc: '2.0',
  //                 id: 1,
  //             }, (err, response) => {
  //                 if (!err) {
  //                     console.log(`Switched to chain ID: ${newChainId}`);
  //                 } else {
  //                     console.error(`Error switching chain ID: ${err}`);
  //                 }
  //             });
  //         } else {
  //             console.log(`Already on chain ID: ${newChainId}`);
  //         }
  //     })
  //     .catch(error => {
  //         console.error(`Error getting current chain ID: ${error}`);
  //     });




  // web3 = new Web3("https://rpcapi.sonic.fantom.network/");
  
  console.log(web3.version);
  
  try {
     //await window.ethereum.send('eth_requestAccounts');
     await window.ethereum.enable();
  } catch (error) {
      // Check if the error is a "User denied account authorization" error
      if (error.code === 4001) {
          // Open the MetaMask wallet app using deep linking
          window.location.href = 'ethereum:';
      } else {
          console.log("window.ethereum.enable() error")
          console.log(error);
      }
  }
  
  var userAccounts = await web3.eth.getAccounts();
  console.log(userAccounts);

  
  userAccount = userAccounts[0];

}


  const call_type = {
    CONNECT: 1,
    SEND_CONTRACT: 2,
    FULL_SCREEN: 3,
  };

  const response_type = {
    ERROR   : 1,
    HASH    : 2,
    RECEIPT : 3,
    ACCOUNT_NUMBER: 4,
    READ_RESPONSE: 5,
  };



// document.getElementById('btn-connectwallet').addEventListener("click", function(event) {
//   ConnectWallet()
// }, {once: false});

// const web3 = new Web3(Web3.givenProvider) ;
// const from = await web3.eth.getAccounts();
var userAccountsGol ;

async function selectAccount(accounts) {
    // Find any existing accountSelector and remove it if found
    const existingAccountSelector = document.querySelector('select.account-selector');
    if (existingAccountSelector) {
        existingAccountSelector.remove();
    }

    // Create a new dropdown menu to let the user select an account
    const accountSelector = document.createElement('select');
    accountSelector.classList.add('account-selector'); // Add a class for easier selection if needed
    
    // Populate the dropdown with available accounts
    accounts.forEach(account => {
        const option = document.createElement('option');
        option.text = account;
        option.value = account;
        accountSelector.appendChild(option);
    });

    // Find the container div
    const connectContainer = document.querySelector('.connect-container');
    
    // Append the dropdown to the container div
    connectContainer.appendChild(accountSelector);


}


// Wait for the DOM content to load before attaching the event listener
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('change', async function(event) {
        if (event.target.classList.contains('account-selector')) {
            const selectedAccount = event.target.value;
            console.log('Selected account:', selectedAccount);
			userAccount =selectedAccount;
			userAccountsGol = selectedAccount;
            if (!selectedAccount) {
                $("#walletAddressDisplay").text("Failed to connect Wallet. Check RPC or install Wallet.");
            } else {
                // You can define an async function here and use await inside it
                try {
                    const usernameOLD = await FAEVENT1.methods.addressToUsername(userAccountsGol).call();
                    if (usernameOLD !== '') {
                        const shortUserAccount = userAccount.substring(0, 4) + '...' + userAccount.substring(userAccount.length - 4);
                        $("#walletAddressDisplay").html("<strong>Connected: </strong>" + usernameOLD + " [" + shortUserAccount + "]");
                        const changenameContainer = document.getElementById("changenameContainer");
                        changenameContainer.style.display = "block";
                    } else {
                        $("#walletAddressDisplay").html("<strong>Connected: </strong>" + userAccount);
                        const registerContainer = document.getElementById("registerContainer");
                        registerContainer.style.display = "block";
                    }
                    $("#walletAddressDisplay").fadeOut(500).fadeIn(500);
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        }
    });
});




async function ConnectWallet() {
  addFantomChain();
  GetWeb3();
  FAEVENT1 = new web3.eth.Contract(mintabi, contractaddress);
  //console.log("ConnectWallet()");
  //console.log(FAEVENT1);

  await GetWeb3();

  console.log("ConnectWallet() getweb3 done");
  console.log(window.ethereum.isConnected());
  console.log(userAccount);



  var userAccounts = await web3.eth.getAccounts();
  selectAccount(userAccounts);
  //userAccount = selectAccount(userAccounts);
  userAccount = userAccounts[0];
  
  console.log(userAccounts);
  console.log(userAccount);
  userAccountsGol = userAccounts[0];
  console.log(userAccountsGol);
  

  if (!userAccount) {
    // If userAccount is undefined, display an error message
    $("#walletAddressDisplay").text("Failed to connect Wallet. Check RPC or install Wallet.");
  } else {
    // If userAccount is defined, display the actual wallet address
    const usernameOLD = await FAEVENT1.methods.addressToUsername(userAccountsGol).call();
    if (usernameOLD !== '') {
        // If usernameOLD is not an empty string, display Connected: usernameOLD [first 4 and last 4 characters of userAccount]
        const shortUserAccount = userAccount.substring(0, 4) + '...' + userAccount.substring(userAccount.length - 4);
        $("#walletAddressDisplay").html("<strong>Connected: </strong>" + usernameOLD + " [" + shortUserAccount + "]");
        const changenameContainer = document.getElementById("changenameContainer");
        changenameContainer.style.display = "block";
    } else {
        // Otherwise, display Connected: userAccount
        $("#walletAddressDisplay").html("<strong>Connected: </strong>" + userAccount);
        // Select the register container element
        const registerContainer = document.getElementById("registerContainer");
        registerContainer.style.display = "block";
        
    }
    // Flash the "Connected" message
    $("#walletAddressDisplay").fadeOut(500).fadeIn(500);
    
  }
}


async function switchWallet() {
	addFantomChain();
	GetWeb3();
	FAEVENT1 = new web3.eth.Contract(mintabi, contractaddress);
	//console.log("ConnectWallet()");
	//console.log(FAEVENT1);
  
	await GetWeb3();
  
	console.log("ConnectWallet() getweb3 done");
	console.log(window.ethereum.isConnected());
	console.log(userAccount);
  
  
  
	var userAccounts = await web3.eth.getAccounts();
	//userAccount = selectAccount(userAccounts);
	userAccount = userAccounts[0];
	
	console.log(userAccounts);
	console.log(userAccount);
	userAccountsGol = userAccounts[0];
	console.log(userAccountsGol);
	
  
	if (!userAccount) {
	  // If userAccount is undefined, display an error message
	  $("#walletAddressDisplay").text("Failed to connect Wallet. Check RPC or install Wallet.");
	} else {
	  // If userAccount is defined, display the actual wallet address
	  const usernameOLD = await FAEVENT1.methods.addressToUsername(userAccountsGol).call();
	  if (usernameOLD !== '') {
		  // If usernameOLD is not an empty string, display Connected: usernameOLD [first 4 and last 4 characters of userAccount]
		  const shortUserAccount = userAccount.substring(0, 4) + '...' + userAccount.substring(userAccount.length - 4);
		  $("#walletAddressDisplay").html("<strong>Connected: </strong>" + usernameOLD + " [" + shortUserAccount + "]");
		  const changenameContainer = document.getElementById("changenameContainer");
		  changenameContainer.style.display = "block";
	  } else {
		  // Otherwise, display Connected: userAccount
		  $("#walletAddressDisplay").html("<strong>Connected: </strong>" + userAccount);
		  // Select the register container element
		  const registerContainer = document.getElementById("registerContainer");
		  registerContainer.style.display = "block";
		  
	  }
	  // Flash the "Connected" message
	  $("#walletAddressDisplay").fadeOut(500).fadeIn(500);
	  
	}
  }


async function switchToFantom() {
  try{
    await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0xFA' }],    // sonic testnet is FAA5 
    });
  }catch (error) {
    // Handle errors appropriately:
    if (error.code === 4902) { // Check for "User rejected the request" error code
      console.error("User rejected the network switch request.");
      // Optionally display a user-friendly message explaining the situation
    } else if (error.code === 4901) { // Check for "Chain not found" error code
      console.error("Fantom Chain not found in your wallet.");
      // Provide clear instructions on how to add the Fantom Chain (e.g., link to a guide)
    } else {
      console.error("Error switching to Fantom Chain:", error);
      // Optionally display a generic error message for other unexpected errors
    }
  }
 }
 setTimeout(switchToFantom, 1000);
// Example usage
//ConnectWallet();


var isfullscreen = false;
function EnterFullScreen(){
  if (isfullscreen){
    window.unityInstance.SetFullscreen(0);
    isfullscreen = false;
  } 
  else{
    window.unityInstance.SetFullscreen(1);
    isfullscreen = true;
  }
}
document.getElementById("ConnectButton").addEventListener("click", function() {
  ConnectWallet()
});
// ConnectWallet();

function JsCallFunction(type, arg_string){
  console.log("JsCallFunction")
  console.log(type)
  console.log(arg_string)


  if(type == call_type.CONNECT){    
    ConnectWallet()  
  }
  else if(type == call_type.FULL_SCREEN){    
    EnterFullScreen()  
  }
  else if (type == call_type.SEND_CONTRACT){
    arg_string = arg_string.toString()
    if (arg_string.startsWith("<sendContract>") && arg_string.endsWith("</sendContract>")){
      const removeSyntax = arg_string.substring("<sendContract>".length).slice(0,arg_string.length-("<sendContract>".length+"</sendContract>".length));
      const splited_text = removeSyntax.split("_%_");
      
      if (splited_text.length == 8){

          var bridge_id   = splited_text[0];
          var address     = splited_text[1];
          var method      = splited_text[2];
          var args        = splited_text[3];
          var price       = splited_text[4];
          var gasLimit    = splited_text[5];
          var gasPrice    = splited_text[6];
          var abi         = splited_text[7];



          sendContract(bridge_id, method, abi, address, args, price, gasLimit, gasPrice) 

      }
    }

  }

}
window.JsCallFunction = JsCallFunction;



async function JsGetFunction(type, arg_string){
  console.log("JsGetFunction")
  console.log(type)
  console.log(arg_string)


  arg_string = arg_string.toString()
  if (arg_string.startsWith("<readContract>") && arg_string.endsWith("</readContract>")){
    const removeSyntax = arg_string.substring("<readContract>".length).slice(0,arg_string.length-("<readContract>".length+"</sendContract>".length));
    const splited_text = removeSyntax.split("_%_");
    
    if (splited_text.length == 5){

      var bridge_id   = splited_text[0];
      var address     = splited_text[1];
      var method      = splited_text[2];
      var args        = splited_text[3];
      var abi         = splited_text[4];

      console.log(bridge_id);
      console.log(address);
      console.log(method);
      console.log(args);
      // console.log(abi);



      var responseString = await readContract(bridge_id, method, abi, address, args, ) 

      
      console.log(JSON.stringify(responseString));

      response(response_type.READ_RESPONSE, bridge_id.toString() + "_%_" + JSON.stringify(responseString))

      return(JSON.stringify(responseString));
    }
  }


}
window.JsGetFunction = JsGetFunction;

async function readContract(id, method, abi, contract, args) {
  
  // navigator.clipboard.writeText("<ContractRead>")
  return new Promise(async (resolve, reject) => {
    try {
      const from = (await web3.eth.getAccounts())[0];
      console.log("readContract");
      console.log(method);
      const result = await new web3.eth.Contract(JSON.parse(abi), contract).methods[method](...JSON.parse(args)).call();
      console.log(result);
      resolve(result); // Resolve the Promise with the result
    } catch (error) {
      console.error(error);
      reject(error); // Reject the Promise in case of an error
    }
  });
}



async function sendContract(id, method, abi, contract, args, value, gasLimit, gasPrice) {
    const from = (await web3.eth.getAccounts())[0];

    console.log(id)
    console.log(from)
    console.log(contract)
    console.log(method)
    console.log(args)
    console.log(value)
    console.log(gasLimit)
    console.log(gasPrice)
    // args = "[\"0xC69658BC4Ec4e903Bc0A04e50705A5225Aa88dfc\", 1]";
    console.log(args)

    new web3.eth.Contract(JSON.parse(abi), contract).methods[method](...JSON.parse(args))
        .send({
          from,
          value,
          gas: gasLimit ? gasLimit : undefined,
          gasPrice: gasPrice ? gasPrice : undefined,
        })
        .on("transactionHash", async (transactionHash) => {
          response(response_type.HASH, transactionHash)
          console.log("artificial delay ppooii");
          const logg = await pollForReceipt(transactionHash);
	        console.log(logg);
        })
        .on("error", (error) => {
          response(response_type.ERROR, error.message)
        })
        .on("receipt", function(receipt) {
  
          receipt["method"] = method;
          console.log(method);
          console.log(String(receipt));
          response(response_type.RECEIPT, JSON.stringify(receipt))
          
        });
}

async function response(respondType, message){

  var responseString = "<response>" + respondType + "_%_" + message + "</response>"

  window.unityInstance.SendMessage("JavascriptBridgeManager", "ResponseToUnity", responseString);

}
//---------support function-----------------
async function pollForReceipt(txHash) {
  const receipt = await web3.eth.getTransactionReceipt(txHash);

  if (receipt) {
    // The transaction has been mined
    return receipt;
  } else {
    // The transaction has not been mined yet
    await delay(300); // Wait for 1 second
    return pollForReceipt(txHash);
  }
}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//----------------------------------------

window.getAggressiveGasPrice = async function() {
  try {
    // Retrieve the current gas price
    const gasPrice = await web3.eth.getGasPrice();

    // Convert the gas price to BigInt
    const gasPriceBigInt = BigInt(gasPrice);

    // Adjust the gas price by multiplying with a factor (e.g., 2 for 100% increase)
    const aggressiveGasPrice = gasPriceBigInt * BigInt(15) / BigInt(10); // Multiplies by 1.5 as an example

    // Convert the gas price to Gwei or other units if desired
    const aggressiveGasPriceGwei = web3.utils.fromWei(aggressiveGasPrice.toString(), 'gwei');

    console.log('Aggressive gas price:', aggressiveGasPriceGwei, 'Gwei');
    window.unityInstance.SendMessage("Web3Manager", "UpdateGasPrice", aggressiveGasPrice.toString());
    return aggressiveGasPrice.toString(); // Return the aggressive gas price
  } catch (error) {
    console.error('Error:', error);
    throw error; // Throw the error
  }
};

//--------------------------------------
const fantomChain = {
  chainId: "0x" + (250).toString(16), // Convert decimal to hexadecimal
  networkId: "0xfa", // Fantom Opera's network ID
  chainName: "Fantom", // Network name
  rpcUrls: ["https://rpc.ankr.com/fantom"], // RPC URL
  nativeCurrency: {
    symbol: "FTM", // Native token symbol
    decimals: 18, // Native token decimals
  },
  blockExplorerUrls: ["https://ftmscan.com/"], // Block explorer URL
};

const addFantomChain = async () => {
  if (window.ethereum && window.ethereum.isMetaMask) {
    // Check for MetaMask injection and availability
    try {
      const { chainId, networkId } = fantomChain;

      // Check if the Fantom chain is already added
      const existingNetworkId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      if (existingNetworkId === networkId) {
        console.log('Fantom chain is already added.');
        return;
      }

      // Add the Fantom chain
      console.log(fantomChain);
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            ...fantomChain, // Include all chain details
          },
        ],
      });
      console.log('Fantom chain added successfully!');
    } catch (error) {
      console.error('Error adding Fantom chain:', error);
    }
  } else {
    console.warn('MetaMask not detected or unavailable.');
  }
};




function mint1() {
  $("#Result").append("<li>Minting 1 Red Packet...</li>");
  FAEVENT1.methods.mint(1).estimateGas({ from: userAccountsGol, value: 900000000000000000 }, function(error, estimateGas) {
    if (error) {
      console.log(error);
      $("#Result").append(error.message + "\n");
      var resultDiv = $("#Result");
        resultDiv.animate({ scrollTop: resultDiv.prop("scrollHeight") }, 500);
    }
    else {
      document.getElementById('deadline').style.display = 'block';
      startAnimation();
      FAEVENT1.methods.mint(1)
      .send({ from: userAccountsGol, value: 900000000000000000, gas: Math.round(estimateGas*1.5)})
      .on("receipt", function(receipt) {
        $("#Result").append("<li>Successful.</li>");
        var receiptarray = receipt.events.MintResult.returnValues[1];
        document.getElementById('deadline').style.display = 'none';
        if (receiptarray[0] > 0) {
          $("#Result").append("<li><b>Get Youpling Red Packet:</b> " + receiptarray[0] + "</li>");
        }
        if (receiptarray[1] > 0) {
          $("#Result").append("<li><b>Get Youlong Red Packet:</b> " + receiptarray[1] + "</li>");
        }
        if (receiptarray[2] > 0) {
          $("#Result").append("<li><b><i>Get Yourake Red Packet:</i></b> " + receiptarray[2] + "</li>");
        }
        if (receiptarray[3] > 0) {
          $("#Result").append("<li><b><i>Get Youking Red Packet:</i></b> " + receiptarray[3] + "</li>");
        }
        console.log(receiptarray[0],receiptarray[1],receiptarray[2],receiptarray[3]);
        var resultDiv = $("#Result");
        resultDiv.animate({ scrollTop: resultDiv.prop("scrollHeight") }, 500);
      })
      .on("error", function(error) {$("#Result").append(error.message + "\n"); 
      console.log(error);
      document.getElementById('deadline').style.display = 'none';
      $("#Result").append("<li>Mint Failed.</li>"); console.log(error);
      var resultDiv = $("#Result");
      resultDiv.animate({ scrollTop: resultDiv.prop("scrollHeight") }, 500);
    });
    }
  });
}
function mint10() {
  $("#Result").append("<li>Minting 10 Red Packets...</li>");
  FAEVENT1.methods.mint(10).estimateGas({ from: userAccountsGol, value: 9000000000000000000 }, function(error, estimateGas) {
    if (error) {
      console.log(error);
      $("#Result").append(error.message + "\n");
      console.log(error);
      var resultDiv = $("#Result");
        resultDiv.animate({ scrollTop: resultDiv.prop("scrollHeight") }, 500);
    }
    else {
      document.getElementById('deadline').style.display = 'block';
      startAnimation();
      FAEVENT1.methods.mint(10)
      .send({ from: userAccountsGol, value: 9000000000000000000, gas: Math.round(estimateGas*1.5)})
      .on("receipt", function(receipt) {
        $("#Result").append("<li>Successful.</li>");
        var receiptarray = receipt.events.MintResult.returnValues[1];
        document.getElementById('deadline').style.display = 'none';
        if (receiptarray[0] > 0) {
          $("#Result").append("<li><b>Get Youpling Red Packet:</b> " + receiptarray[0] + "</li>");
        }
        if (receiptarray[1] > 0) {
          $("#Result").append("<li><b>Get Youlong Red Packet:</b> " + receiptarray[1] + "</li>");
        }
        if (receiptarray[2] > 0) {
          $("#Result").append("<li><b><i>Get Yourake Red Packet:</i></b> " + receiptarray[2] + "</li>");
        }
        if (receiptarray[3] > 0) {
          $("#Result").append("<li><b><i>Get Youking Red Packet:</i></b> " + receiptarray[3] + "</li>");
        }
        console.log(receiptarray[0],receiptarray[1],receiptarray[2],receiptarray[3]);
        var resultDiv = $("#Result");
        resultDiv.animate({ scrollTop: resultDiv.prop("scrollHeight") }, 500);
      })
      .on("error", function(error) {$("#Result").append(error.message + "\n"); 
      console.log(error);
      document.getElementById('deadline').style.display = 'none';
      $("#Result").append("<li>Mint Failed.</li>"); console.log(error);
      var resultDiv = $("#Result");
      resultDiv.animate({ scrollTop: resultDiv.prop("scrollHeight") }, 500);
    });
    }
  });
}

document.getElementById('mint1').addEventListener('click', function() {
  mint1();
});
document.getElementById('mint10').addEventListener('click', function() {
  mint10();
});
document.getElementById('registerName').addEventListener('click', function() {
  registerUsername();
});
document.getElementById('changeName').addEventListener('click', function() {
  changeUsername();
});

//-------------------REGISTER NAME CHANGE NAME ---------------------------------
async function registerUsername() {
  const username = document.getElementById('usernameInput').value;

  // Regular expression to match characters other than a-z, A-Z, 0-9, or _
  const regex = /^[a-zA-Z0-9_]+$/;

  // Check if the username contains characters other than a-z, A-Z, 0-9, or _
  if (!regex.test(username)) {
    // If the username contains invalid characters, show a warning
    alert('Username can only contain letters (a-z, A-Z), numbers (0-9), or underscore (_)');
    return;
  }

  // Check if the username is already taken or not
  const userAddress = await FAEVENT1.methods.getAddressFromUsername(username).call();
  const usernameOLD = await FAEVENT1.methods.addressToUsername(userAccountsGol).call();
  console.log(userAddress);
  console.log(usernameOLD);

  // Check if the userAddress is a burner address (0x000...000)
  if (userAddress == '0x0000000000000000000000000000000000000000') {
    
    // Call the contract method to register the username
    const transaction = await FAEVENT1.methods.registerPlayer(username).send({ from: userAccountsGol, value: 100000000000000000 });

    // If transaction is successful or user already has a username, hide the register container
    // You can replace the condition below with the appropriate event checks
    if (transaction.status === true || userAddress !== '0x0000000000000000000000000000000000000000') {
      document.getElementById('registerContainer').style.display = 'none';
      const usernameNEW = await FAEVENT1.methods.addressToUsername(userAccountsGol).call();
      if (usernameNEW !== '') {
          // If usernameOLD is not an empty string, display Connected: usernameOLD [first 4 and last 4 characters of userAccount]
          const shortUserAccount = userAccount.substring(0, 4) + '...' + userAccount.substring(userAccount.length - 4);
          $("#walletAddressDisplay").html("<strong>Connected: </strong>" + usernameNEW + " [" + shortUserAccount + "]");
      } else {
          // Otherwise, display Connected: userAccount
          $("#walletAddressDisplay").html("<strong>Connected: </strong>" + userAccount);
      }
      $("#walletAddressDisplay").fadeOut(500).fadeIn(500);
	  previousMessageCount =0;
    }
    
  } else {
    // If the username is already taken, show a warning
    alert('Username already taken!');
  }
}


async function changeUsername() {
  const username = document.getElementById('changeusernameInput').value;

  // Regular expression to match characters other than a-z, A-Z, 0-9, or _
  const regex = /^[a-zA-Z0-9_]+$/;

  // Check if the username contains characters other than a-z, A-Z, 0-9, or _
  if (!regex.test(username)) {
    // If the username contains invalid characters, show a warning
    alert('Username can only contain letters (a-z, A-Z), numbers (0-9), or underscore (_)');
    return;
  }
  console.log(username);
  // Check if the username is already taken or not
  const userAddress = await FAEVENT1.methods.getAddressFromUsername(username).call();
  const usernameOLD = await FAEVENT1.methods.addressToUsername(userAccountsGol).call();
  console.log(userAddress);
  console.log(usernameOLD);

  // Check if the userAddress is a burner address (0x000...000)
  if (userAddress == '0x0000000000000000000000000000000000000000') {
    
    // Call the contract method to register the username
    const transaction = await FAEVENT1.methods.changeUsernameOwnerofUsername(username).send({ from: userAccountsGol,value: 5000000000000000000 });

    // If transaction is successful or user already has a username, hide the register container
    // You can replace the condition below with the appropriate event checks
    if (transaction.status === true || userAddress !== '0x0000000000000000000000000000000000000000') {
      document.getElementById('registerContainer').style.display = 'none';
      const usernameNEW = await FAEVENT1.methods.addressToUsername(userAccountsGol).call();
      if (usernameNEW !== '') {
          // If usernameOLD is not an empty string, display Connected: usernameOLD [first 4 and last 4 characters of userAccount]
          const shortUserAccount = userAccount.substring(0, 4) + '...' + userAccount.substring(userAccount.length - 4);
          $("#walletAddressDisplay").html("<strong>Connected: </strong>" + usernameNEW + " [" + shortUserAccount + "]");
      } else {
          // Otherwise, display Connected: userAccount
          $("#walletAddressDisplay").html("<strong>Connected: </strong>" + userAccount);
      }
      $("#walletAddressDisplay").fadeOut(500).fadeIn(500);
	  previousMessageCount =0;
      const changenameContainer = document.getElementById("changenameContainer");
      changenameContainer.style.display = "block";
    }
    
  } else {
    // If the username is already taken, show a warning
    alert('Username already taken!');
  }
}


//-----------------MEssage system -------------------
let previousMessageCount = 0;

// Function to periodically check for new messages
async function checkForNewMessages() {
  try {
    // Read the current message count from the contract
    const currentMessageCount = await FAEVENT1.methods.getMessageCount(0).call();
    console.log(currentMessageCount);

    // Compare the current message count with the previous count
    if (currentMessageCount > previousMessageCount) {
      // If there are new messages, read the latest message from the contract
      const CHAT = await FAEVENT1.methods.getLatestMessage(0, Math.min(currentMessageCount, 50)).call();

      // Display the new messages in the text box
      let Chatroomfull = "";
      for (let i = 0; i < CHAT.length; i++) {
        const NAME = await FAEVENT1.methods.addressToUsername(CHAT[i].sender).call();
        let leftFour = CHAT[i].sender.substr(0, 4);
        let rightFour = CHAT[i].sender.substr(-4);
        const date = new Date(CHAT[i].timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

        
        // Extract the various components of the date
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based, so add 1
        const day = date.getDate();
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        // Determine AM/PM
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert 24-hour time to 12-hour time
        if (hours > 12) {
            hours -= 12;
        } else if (hours === 0) {
            hours = 12;
        }

        // Format the date and time
        // Format the date and time
        const formattedDateTime = `<span style="color: black">${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}</span>`;

        // Wrap the NAME section with a <span> tag and apply yellow color

        let nameSection;
		if (NAME === '') {
			nameSection = `<span style="color: yellow"><sub>[${leftFour}...${rightFour}]</sub></span>`;
		} else {
			nameSection = `<span style="color: yellow">${NAME}<sub></sub></span>`;
			//nameSection = `<span style="color: yellow">${NAME}<sub>[${leftFour}...${rightFour}]</sub></span>`;
		}

        let concatenated = `[<i>${formattedDateTime}</i>] ${nameSection}`;
        let msg = replaceSpecialCharacters(String(CHAT[i].message));
        Chatroomfull += `<li>${concatenated} :  ${msg}</li>`;
      }
      $("#Message").empty();
      $("#Message").append(`<b><u>PreSonic Chatroom</b></u>${Chatroomfull}`);
      //$("#Message").text($("#Message").text() + String(Chatroomfull));
      //console.log(CHAT);
      $("#Message").animate({ scrollTop: $("#Message").prop("scrollHeight") }, 500);
    }

    // Update the previous message count
    previousMessageCount = currentMessageCount;
  } catch (error) {
    console.error("Error:", error);
  }
}
function replaceSpecialCharacters(text) {
  return text.replace(/&/g, '&amp;')
             .replace(/</g, '&lt;')
             .replace(/>/g, '&gt;')
             .replace(/"/g, '&quot;')
             .replace(/'/g, '&#39;');
}


// Periodically call the function to check for new messages
setInterval(checkForNewMessages, 2000); // Check every 2 seconds

// Define the async function for posting messages
async function postMessage() {
  const message = document.getElementById("userMesageInput").value.trim();

  // Check if the message exceeds 230 words
  const wordCount = message.length;
  if (wordCount > 230) {
      alert("Your message exceeds the maximum word limit of 230.");
      return;
  }

  try {
      // Perform the transaction to post the message
      const transaction = await FAEVENT1.methods.postMessage(0,message).send({ from: userAccount, value: web3.utils.toWei("0.03", "ether") });
      // Clear the message input box
      document.getElementById("userMesageInput").value = "";
      // Check for new messages
      checkForNewMessages();
  } catch (error) {
      // Alert the error if the transaction fails
      alert("Error posting message: " + error.message);
  }
}

// Add event listener to the Post button
document.getElementById("post").addEventListener("click", postMessage);














//-------------------------------------------------------------------------------------------
var $ = jQuery;
var animationTime = 25,
    days = 7;
 
    function startAnimation() {

    // timer arguments: 
    //   #1 - time of animation in mileseconds, 
    //   #2 - days to deadline

    $('#progress-time-fill, #death-group').css({'animation-duration': animationTime+'s'});

    var deadlineAnimation = function () {
        setTimeout(function(){
            $('#designer-arm-grop').css({'animation-duration': '1.5s'});
        },0);

        setTimeout(function(){
            $('#designer-arm-grop').css({'animation-duration': '1s'});
        },4000);

        setTimeout(function(){
            $('#designer-arm-grop').css({'animation-duration': '0.7s'});
        },8000);

        setTimeout(function(){
            $('#designer-arm-grop').css({'animation-duration': '0.3s'});
        },12000);

        setTimeout(function(){
            $('#designer-arm-grop').css({'animation-duration': '0.2s'});
        },15000);
    };

    function timer(totalTime, deadline) {
        var time = totalTime * 1000;
        var dayDuration = time / deadline;
        var actualDay = deadline;

        var timer = setInterval(countTime, dayDuration);

        function countTime() {
            --actualDay;
            $('.deadline-days .day').text(actualDay);

            if (actualDay == 0) {
                clearInterval(timer);
                $('.deadline-days .day').text(deadline);
            }
        }
    }

    var deadlineText = function () {
        var $el = $('.deadline-days');
        var html = '<div class="mask-red"><div class="inner">' + $el.html() + '</div></div><div class="mask-white"><div class="inner">' + $el.html() + '</div></div>';
        $el.html(html);
    }

    deadlineText();

    deadlineAnimation();
    timer(animationTime, days);

    setInterval(function(){
        timer(animationTime, days);
        deadlineAnimation();

        console.log('begin interval', animationTime * 1000);

    }, animationTime * 1000);

};

document.getElementById('viewPaintSwap').addEventListener('click', function() {
  // Replace 'https://example.com' with the URL you want to open
  var newWindow = window.open('https://paintswap.finance/marketplace/fantom/collections/fantom-adventure---event-v1/nfts', '_blank');
  
  // Check if the new window was blocked by the browser's popup blocker
  if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
    alert('The popup window was blocked. Please enable popups for this site.');
  }
});



//----------------------------------
setTimeout(ConnectWallet, 1500); // 1500 milliseconds = 1.5 seconds
var contractaddress = '0xfDB49602d39D76eC9A43082B84f10f15EE656769';
var mintabi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "_index",
				"type": "uint8"
			}
		],
		"name": "addMasterContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newUsername",
				"type": "string"
			}
		],
		"name": "changeUsernameMasterContract",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newUsername",
				"type": "string"
			}
		],
		"name": "changeUsernameOwnerofUsername",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			}
		],
		"name": "deleteUsernameToAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_attempts",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "attempts",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256[4]",
				"name": "results",
				"type": "uint256[4]"
			}
		],
		"name": "MintResult",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "playerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "username",
				"type": "string"
			}
		],
		"name": "PlayerRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_room",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "postMessage",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			}
		],
		"name": "registerPlayer",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_index",
				"type": "uint8"
			}
		],
		"name": "removeMasterContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			}
		],
		"name": "setAddressToUsername",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "setUsernameToAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newContractAAddress",
				"type": "address"
			}
		],
		"name": "updateEVENTContractAAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newContractAAddress",
				"type": "address"
			}
		],
		"name": "updateRANDContractAAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "playerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "oldUsername",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newUsername",
				"type": "string"
			}
		],
		"name": "UsernameChanged",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addressToUsername",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractEVENT",
		"outputs": [
			{
				"internalType": "contract FARPG_EventInterface",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractRAND",
		"outputs": [
			{
				"internalType": "contract FARPG_RandomM1",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			}
		],
		"name": "getAddressFromUsername",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_room",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getAMessage",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_room",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_indexstart",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_indexend",
				"type": "uint256"
			}
		],
		"name": "getBatchMessage",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "message",
						"type": "string"
					}
				],
				"internalType": "struct FARPG_NameSystem.MessageType[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_room",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_latestx",
				"type": "uint256"
			}
		],
		"name": "getLatestMessage",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "message",
						"type": "string"
					}
				],
				"internalType": "struct FARPG_NameSystem.MessageType[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMasterContract",
		"outputs": [
			{
				"internalType": "address[10]",
				"name": "",
				"type": "address[10]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_room",
				"type": "uint256"
			}
		],
		"name": "getMessageCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalRooms",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalRooms",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUsedRooms",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "usedRooms",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getUsernameFromAddress",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "masterContracts",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Messages",
		"outputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "sentMessageNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "UsedRooms",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "usernameToAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

var FAEVENT1;

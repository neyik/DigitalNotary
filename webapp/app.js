$(document).ready(function() {
    start();
  });
  
  function FileHash(callback) {
    input = document.getElementById("hashFile");
    if (!input.files[0]) {
      alert("Please select a file first");
    }
    else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = function (e) {
        content = e.target.result;
        var shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
        shaObj.update(content);
        var hash = "0x" + shaObj.getHash("HEX");
        callback(null, hash);
      };
      fr.readAsArrayBuffer(file);
    }
  };
  
  
  function reg () {
    FileHash(function (err, hash) {
      NPOST(hash, function(err, tx) {
        $("#responseText").html("<b>File successfully registered onto Ethereum blockchain.</b>"
          + "<p>Document Hash: " + hash +"</p>"
          + "<p>Transaction ID: " + tx +"</p>"
          + "<p>Contract's Address: " + address +"</p>"
          + "<p><b>Please wait for transaction to be completed.</b></p>"

        );
      });
    });
  };
  
  function find () {
    FileHash(function (err, hash) {
      NSEARCH(hash, function(err, resultObj) {
        if (resultObj.blockNo != 0) {
          $("#responseText").html("<b>File is on Ethereum blockchain.</b>"
            + "<p>Document Hash: " + hash + "</p>"
            + "<p>Block Number: " + resultObj.blockNo + "</p>"
            + "<p>Timestamp: " + resultObj.timestamp + "</p>"
          );
        } else {
          $("#responseText").html("<p>File is not on Ethereum blockchain.</p>"
            + "<p>Document Hash: " + hash + "</p>"
          );
        }
      });
    });
  };

const serverUrl = "https://qjrksxsf6pxi.usemoralis.com:2053/server";
const appId = "IyQV9Tv6FVvoPed3JEUZLqfoWqqFfjdDokdN3xZg";
Moralis.start({ serverUrl, appId});

async function login() {
  await Moralis.authenticate();
}

uploadMetadata= async (fileURL) =>{
  const name = document.getElementById('metadataName').value;
  const description = document.getElementById('metadataDescription');
  const metadata ={
    "name": name,
    "description": description,
    "file": fileURL
  }
  const file = new Moralis.File("file.json", {base64: btoa(JSON.stringify(metadata))});
  await file.saveIPFS(); 
  $("#responseText").html("<p>File uploaded to IPFS successfully.</p>"
  + "<p>IPFS link: " + file.ipfs() + "</p>"
  
  );
  

}
uploadFile = async() =>{
  const data = hashFile.files[0]
  const file= new Moralis.File(data.name, data)
  await file.saveIPFS({useMasterKey:true});
  console.log(file.ipfs(), file.hash());
  return file.ipfs();
}


gogogo = async () =>{
  const file= await uploadFile();
  await uploadMetadata(file);
  };
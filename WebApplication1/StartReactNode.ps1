
$nodeCommand = "cmd /c start powershell -noexit -command { node $PSScriptRoot\Node-Graphql-Apollo\server3.js }";
invoke-expression $nodeCommand

$reactCommand = "cmd /c start powershell -noexit -command { npm run --prefix $PSScriptRoot\React-Frontend start }"
invoke-expression $reactCommand
with builtins;
    { pkgs ? import
        (fetchTarball {
            name = "nixpkgs-unstable-2023-09-06";
            url = "https://github.com/NixOS/nixpkgs/archive/6af55cb91ca2005516b9562f707bb99c8f79bf77.tar.gz";
            sha256 = "sha256:1h65myd1bm32a429539dal9lmhnrb4mai8c4zn4s1jpkmy47x8ly";
        })
        {}
        , overlays ? [ ]
        , config ? { }
        , system ? builtins.currentSystem
    }:
let
    name = "Travel guide";


#   DOTENV
    env_bootstrap = with pkgs; writeScriptBin "__env_bootstrap" ''
            cp .env.default .env.development
            cp .env.default .env
        '';

#   API
    api_install = with pkgs; writeScriptBin "__api_install" ''
       npm install
    '';

    api_run = with pkgs; writeScriptBin "__api_run" ''
        npm run start:dev
    '';

#   SETUP

    install = with pkgs; writeScriptBin "__install" ''
        __env_bootstrap
        __api_install
    '';

    overmindPort = 4333;
    procfile = "./config/service.procfile";
    nginx_conf = "./config/nginx.conf";

    run = with pkgs; writeScriptBin "__run" ''
        export OVERMIND_NO_PORT="1"
        export OVERMIND_SOCKET=":${toString overmindPort}"
        export OVERMIND_NETWORK="tcp"
        export OVERMIND_TMUX_CONFIG="./tmux.conf"


        export PATH="${tmux}/bin/:$PATH"

        ${overmind}/bin/overmind start -f ${procfile} --title "start" --shell ${bash}/bin/bash -D
        sleep 0.2
        ${overmind}/bin/overmind connect
      '';

    tools = with pkgs; {
        cli = [
            coreutils
            netcat-gnu
            nodejs_20
            overmind
            commitizen
        ];
        scripts = [
            env_bootstrap
            api_install
            api_run
            install
            run
        ];
    };
    paths = pkgs.lib.flatten [ (builtins.attrValues tools) ];
in
    pkgs.buildEnv {
    inherit name paths;
    buildInputs = paths;
}
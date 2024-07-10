with builtins;
    { pkgs ? import
        (fetchTarball {
            name = "nixpkgs-unstable-2023-09-06";
            url = "https://github.com/NixOS/nixpkgs/archive/f884153fb185d60e57d3c706f6eed274efff7d03.tar.gz";
            sha256 = "sha256:033g5vak0dh2ckfxfw73kfqw55bifkiglb5p6azx1hgmivmy2apb";
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
        npm start
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
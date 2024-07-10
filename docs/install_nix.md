### Nix Setup
> If you don't already have nix set up on your machine, follow this steps!

#### Install nix
```bash
sh <(curl -L https://nixos.org/nix/install) --daemon
```
#### configure nix, adding some features that speed things up

```bash
mkdir -p ~/.config/nix/
echo -e 'max-jobs = auto\nexperimental-features = nix-command flakes' > ~/.config/nix/nix.conf
```
#### configure global nix caches

copy & paste the entire entry in your terminal:
```bash
sudo tee /etc/nix/nix.conf <<EOF
build-users-group = nixbld
substituters = https://cache.nixos.org/
trusted-public-keys = cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY=
EOF
```

#### _NOTE: restart your terminal here!_

##### Install and configure direnv + nix-direnv

```bash
nix-env -i direnv nix-direnv
echo  "source $HOME/.nix-profile/share/nix-direnv/direnvrc" >~/.direnvrc
echo  "[[ -f ~/.bashrc ]] && . ~/.bashrc" >~/.bash_profile
echo  'eval "$(direnv hook bash)"' >>~/.bashrc
echo  'eval "$(direnv hook zsh)"' >>~/.zshrc
```

##### _NOTE: restart your terminal once more here!_
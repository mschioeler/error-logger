# error-logger
Repo med kode til `errorlogger.dk`.
## Live git-setup
Generate ssh key-pair:
```
mkdir ~/.ssh
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
Contact admin @mschioeler to add public key to accepted keys on server. Once this is done, you an set up the actual host repo as a live remote like so:
```
eval `ssh-agent -s`
ssh-add
git remote add live ssh://bv4zh9npfoev@160.153.129.33/home/bv4zh9npfoev/error-logger.git
```
The first time you push to the remote, make sure to specify master branch:
```
git push live +master:refs/head/master
```
From then, simply ```git push live``  on branch master will do.
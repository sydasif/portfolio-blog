---
title: "Docker for Network Engineers - Introduction"
date: "2023-06-01"
excerpt: "A practical introduction to Docker containers for network engineers. Learn how to install Docker on Ubuntu, run containers, pull images, and manage volumes."
description: "This blog post introduces Docker to network engineers, covering installation on Ubuntu, key Docker commands, image and container management, and volume mounting techniques."
category: "Docker"
tags:
  [
    "Docker",
    "Network Automation",
    "Ubuntu",
    "Linux Containers",
    "DevOps",
    "Docker Tutorial",
    "Docker Installation",
    "Network Engineers",
    "Containerization",
    "Docker Images",
  ]
image: "/images/docker.jpg"
author: "Syed Asif"
readingTime: "5 min read" # Placeholder - calculate based on content
status: "published" # or "draft"
lastModified: "2024-07-29"
---

Docker containers are lightweight, portable, and efficient virtual environments that package applications and their dependencies. They enable consistent and rapid software deployment across different environments, making them a foundation for modern application development and deployment practices.

## What is Docker?

Docker is an open-source platform that uses containerization, a form of OS-level virtualization, to package and deliver software in containers. These containers are lightweight, isolated environments that include both applications and their dependencies. Docker simplifies software distribution and deployment, making it easier to manage and run applications consistently across different environments.

## Docker technology

When most people talk about Docker, they’re referring to the technology that runs containers. However, there are at least three things to be aware of when referring to Docker as a technology:

- The ‘runtime’ in Docker executes and manages containers, providing the environment for running applications
- Daemon, also known as the “engine,” is a fundamental part of Docker technology. It serves as the background service responsible for managing Docker containers, handling container requests, and ensuring their proper execution.
- For more to understand about Docker technology, see website.

## Docker Installation

You can install Docker Engine in different ways, depending on your needs. Download Docker from the official website for your platform.

### Installing Docker on Linux

In this tutorial, you will look at one of the ways to install Docker on Ubuntu Linux 20.04.

Before you install Docker Engine for the first time on a new host machine, you need to set up the Docker repository. Afterward, you can install and update Docker from the repository.

#### Set up the repository

Update the apt package index and install packages to allow apt to use a repository over HTTPS:

```bash
$ sudo apt-get update
$ sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

Add Docker’s official GPG key:

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

Use the following command to set up the stable repository.

```bash
$ echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### Install Docker Engine

Update the apt package index, and install the latest version of Docker Engine and containerd, or go to the next step to install a specific version:

```bash
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Verify that Docker Engine is installed correctly by running hello-world image with below command:

```bash
$ sudo docker run hello-world
```

The Docker installation is now completed. Docker is now installed, and you can test and run some commands to get some hands-on and information about Docker.

```bash
$ sudo docker --version
$ sudo docker info
```

## Docker Image

A Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings.

It’s helpful to think of a Docker image as an object that contains an OS file-system, an application, and all application dependencies — like a virtual machine template is a stopped virtual machine — a stopped container.

Getting images from Docker onto your host system is called “pulling”.

```bash
$ docker pull ubuntu:latest
```

To check downloaded images on your system, run the docker image ls command.

```bash
$ docker image ls
```

```
REPOSITORY                    TAG       IMAGE ID       CREATED        SIZE
ubuntu                        latest    ba6acccedd29   2 weeks ago    72.8MB
```

You can also run below command as well.

```bash
$ docker images
```

```
REPOSITORY                    TAG       IMAGE ID       CREATED        SIZE
ubuntu                        latest    ba6acccedd29   2 weeks ago    72.8MB
```

The output of both commands is the same.

## Docker Containers

A Docker container is like a well-organized box for software. It has everything an app needs to run smoothly. You can easily move this box to different computers, and the app inside will work reliably. Think of an ‘image’ as the blueprint for the box, and a ‘registry’ as a library of these images. You can find and download these images from places like Docker Hub to use in your containers.

Now that we have an image pulled locally, we can use the docker container run command.

```bash
$ docker container run -it ubuntu:latest /bin/bash
```

```
root@20e3b1f9bab4:/#
```

The docker container run command tells the Docker daemon to start a new container.

- The `-it` flag tells Docker to make the container interactive and to attach the current shell to the container’s terminal.

- Next, the command tells Docker that we want the container to be based on the `ubuntu:latest` image.

- Finally, we tell Docker which process we want to run inside the container.

- `-d` — run in a detached mode as a background service.

- `-i` — keep STDIN open even if not attached.

- `-t` — tty session with the container.

`--name` flag is used to name your container with a custom name.
Press `Ctrl+PQ` to exit the container without terminating it. This will land your shell bash at the terminal of your Docker host.

You can see all running containers on your system using the `docker container ls` command.

```bash
$ docker container ls
```

```
20e3b1f9bab4   ubuntu:latest   "/bin/bash"   11 minutes ago   Up 11 minutes             frosty_williams
```

Or you can also run below command as well.

```bash
$ docker ps
```

```
CONTAINER ID   IMAGE           COMMAND       CREATED          STATUS          PORTS     NAMES
20e3b1f9bab4   ubuntu:latest   "/bin/bash"   11 minutes ago   Up 11 minutes             frosty_williams
```

To list all containers, we can use `docker ps -a`.

### Attaching to running containers

To attach to a running Docker container, you can use the `docker container exec` or `docker attach` command. These commands allow you to access the container's terminal or shell. Here's how you can do it:

```bash
$ docker container exec -it frosty_williams bash
```

```
root@20e3b1f9bab4:/# ls
bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```

```bash
$ docker attach frosty_williams
```

```
root@20e3b1f9bab4:/# ls
bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```

We can also use CONTAINER ID instead of NAMES in the above command.

Exit the container again by pressing `Ctrl+PQ`. Stop the container and remove it using the `docker container stop` and `docker container rm` commands.

```bash
$ docker container stop frosty_williams
frosty_williams
$ docker container rm frosty_williams
frosty_williams
```

## Mount host and container volumes

I am currently inside the `my_doc` folder which I have created and it’s empty. With the below command using the `-v` flag, we will mount the current working directory (doc) with the tmp folder inside the container.

```bash
$ ~/my_doc docker run -it --name ubuntu -v $PWD:/tmp ubuntu:focal
```

```
root@7e349527f674:/# cd tmp
root@7e349527f674:/tmp# ls
root@7e349527f674:/tmp# touch file.txt
root@7e349527f674:/tmp# ls
file.txt
root@7e349527f674:/tmp# cd
root@7e349527f674:~# exit
exit
```

Now, we can exchange files to and from the container and to the host operating system.

```bash
$ ~/my_doc docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
$ ~/my_doc ls
file.txt
```

We cannot mount a volume to an already created / running container.

## Windows Containers vs. Linux Containers

It’s vital to understand that a running container shares the kernel of the host machine it is running on. It means that a containerized Windows app will not run on a Linux-based Docker host, and vice versa. Windows containers require a Windows host, and Linux containers require a Linux host. It is possible to run Linux containers on Windows machines. For example, Docker Desktop running on Windows has two modes — “Windows containers” and “Linux containers”.

Depending on your version of Docker Desktop, the Linux container runs either inside a lightweight Hyper-V VM or using the Windows Subsystem for Linux (WSL). The WSL option is newer and the strategic option for the future as it doesn’t require a Hyper-V VM and offers better performance and compatibility.

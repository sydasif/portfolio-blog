---
title: "Docker for Network Engineers - Lab"
date: "2023-08-25"
excerpt: "Learn how to integrate a Docker container running Netmiko with a GNS3 network lab for practical network automation testing."
description: "This blog post walks through connecting a Docker container with Python and Netmiko to a GNS3 network lab. It covers setting up the lab using VMware, Ubuntu Server, and configuring router and switch devices to test network scripts from inside the container."
category: "Docker"
tags:
  - Docker
  - GNS3
  - Network Automation
  - Netmiko
  - Python
  - Network Labs
image: "/images/docker.jpg"
---

Docker is a useful tool for network engineers. It allows you to develop, deploy, and run applications inside lightweight, isolated containers. Although Docker is commonly used for software development and deployment, it can also be valuable in network engineering for several reasons:

- **Isolation:** Containers provide separation between applications and their dependencies. This is ideal for testing configurations and running networking tools without interference.
- **Reproducibility:** Docker images ensure everyone uses the same setup, simplifying troubleshooting and testing.
- **Quick Deployment:** Containers can be quickly spun up and removed.
- **Environment Isolation:** Each tool can live in its own container, avoiding software conflicts.
- **Version Control:** Docker images can be versioned and stored, offering a way to manage changes in your tooling.

Using Docker in network engineering involves learning Docker fundamentals and building custom images, as covered earlier in this series.

## Automation Lab with GNS3

In this post, I connect the Docker container running a Netmiko based Python script to a network created in GNS3 for testing.

### Network Topology

![Lab Topology](/images/docker-lab.png)

**Host Setup:**

- Windows 10 with GNS3 GUI
- GNS3 VM on VMware Workstation 17 Pro
- Ubuntu Server(vm) as the Docker host

**Steps:**

1. Install Ubuntu Server on VMware.
2. Install Docker on the Ubuntu Server.
3. Add the VM to your GNS3 project and ensure to check the “Allow GNS3 to use this host” option.

### Adding Ubuntu Server

To add the Ubuntu Server to your GNS3 topology, create an extra virtual Ethernet adapter.

### Vmnet Configuration

Add two Ethernet adapters. After configuration, **restart your Windows machine**.

### IP Configuration

Assign an IP address to the `Vmnet2` adapter.

![IP Setting](/images/ip-setting.png)

Then, configure the Ubuntu Server’s network interface with a static IP:

```bash
# Example static IP configuration
IP Address: 10.10.10.2
Netmask: 255.255.255.0
Gateway: 10.10.10.1
```

### Windows Firewall Configuration

Enable the following inbound rules in Windows Defender Firewall:

- **File and Printer Sharing (Echo Request — ICMPv4-In) \[Private]**
- **File and Printer Sharing (Echo Request — ICMPv6-In) \[Private]**

![Windows Setting](/images/fire-wall.png)

This ensures the host can respond to ping requests from GNS3.

Now the lab setup is complete.

---

## Router Configuration

```bash
hostname R1
enable password tech
no ip domain lookup
ip domain name tech.com
username admin privilege 15 password 0 cisco

interface FastEthernet0/0
 description Link-to-SW1
 ip address 10.10.10.9 255.255.255.0
 speed 100
 full-duplex

line vty 0 4
 logging synchronous
 login local
```

## Switch Configuration

```shell
hostname SW1
enable password tech
username admin privilege 15 password 0 cisco
ip domain-name tech.com

interface GigabitEthernet0/0
 description Link-to-R1
 switchport access vlan 10
 switchport mode access
 speed 100
 duplex full
 no negotiation auto

interface GigabitEthernet0/1
 description Ubuntu_Server
 switchport access vlan 10
 switchport mode access
 speed 100
 duplex full
 no negotiation auto

interface Vlan10
 ip address 10.10.10.1 255.255.255.0

line vty 0 4
 logging synchronous
 login local
```

---

## Testing the Python Script from Docker Container

Start the container you created earlier:

```bash
$ docker start netmiko
netmiko
```

Run the Python script inside the container:

```bash
$ docker exec -it netmiko python app.py
```

**Sample Output:**

```
Interface                  IP-Address       OK? Method Status                Protocol
FastEthernet0/0            10.10.10.9       YES NVRAM  up                    up
FastEthernet0/1            unassigned       YES NVRAM  administratively down down
```

✅ Success! You have now tested your Netmiko script in a lab environment using GNS3 and Docker.

---

## Conclusion

Docker offers significant value to network engineers by providing:

* **Consistency** across different environments
* **Isolation** for tool and config testing
* **Reproducibility** for collaborative work
* **Flexibility** in lab simulations and integration with platforms like GNS3

Keep exploring and expanding your lab environment with Dockerized tools and automation scripts.

---
title: "Docker for Network Engineers - Networking"
date: "2023-06-03"
excerpt: "Understand how Docker handles container networking — from bridge and host modes to Mac VLAN, IP VLAN, and advanced L3 setups — all tailored for network engineers."
description: "This post explores Docker networking for network engineers, covering default bridge networks, port mapping, custom networks, host mode, and advanced configurations like Mac VLAN and IP VLAN. Learn when and how to apply each to optimize container communication and isolation."
category: "Docker Networking"
tags: ["Docker", "Networking", "Network Engineers", "Containers"]
image: "/images/docker.jpg"
---

Docker containers have changed how we build, deploy, and manage applications. One critical part of this change is Docker’s networking capabilities, which allow containers to communicate with each other and the outside world. In this blog post, we’ll cover Docker networking — from basics like bridge networks and manual port settings to advanced techniques like Mac VLAN, IP VLAN, and IP VLAN L3 networking.

## Different Types of Docker Networks

Docker offers various network types to meet different needs. Knowing when and how to use each type is essential for managing Docker networks effectively:

- **Bridge Network**: A basic internal network for containers.
- **Host Network**: Use this when you require top-notch network performance.
- **Mac VLAN**: Allows containers to connect directly to the physical network.
- **IP VLAN**: Provides shared MAC addresses and unique IP addresses for containers.
- **Overlay Network**: Enables containers to communicate across different hosts.
- **Null Network**: A network that doesn’t connect to anything.
- **L3 Network**: Advanced setup for segmentation, routing, and security.

Docker gives you control over creating and managing networks for your containers. You can even make your own network plugins to expand Docker’s network features.

### Common Docker Network Commands

```bash
docker network create        # Makes a new network
docker network ls            # Lists existing networks
docker network inspect       # Shows details about a network
docker network rm            # Deletes a network
docker network prune         # Removes unused networks
docker network connect       # Connects a container to a network
docker network disconnect    # Disconnects a container from a network
````

## Docker’s Default Bridge Network

Let’s start with the basics using Docker’s default bridge network. When you launch a container, it can access the internet by default:

```bash
$ docker run --name test -it alpine
/ # ping -c 3 google.com
```

Example output:

```
PING google.com (172.217.19.206): 56 data bytes
64 bytes from 172.217.19.206: seq=0 ttl=127 time=74.688 ms
64 bytes from 172.217.19.206: seq=1 ttl=127 time=90.391 ms
64 bytes from 172.217.19.206: seq=2 ttl=127 time=73.555 ms
```

By default, Docker containers on Linux connect to a `bridge` network backed by the Linux kernel bridge called `docker0`.

```bash
$ ip link show
```

Example output:

```
3: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 ...
9: vethfce7672@if8: <BROADCAST,MULTICAST,UP,LOWER_UP> ...
```

Understanding this is essential before setting up advanced networks.

## Manual Port Configuration in Docker

Containers can talk internally, but for external access, you need to map ports:

```bash
docker run -d -p 80:8080 my-web-app-container
```

This maps port 80 on your host to port 8080 in the container, exposing your app externally. This manual configuration is helpful for flexible and secure setups.

## Docker Networking with User-Defined Bridge Networks

User-defined bridge networks offer more control and isolation. They’re great for separating services in multi-tier applications.

### Steps:

1. Create networks:

```bash
docker network create web-tier
docker network create app-tier
docker network create db-tier
```

2. Connect containers using the `--network` option.

These networks improve security, isolation, and scalability for complex applications.

## Docker’s Host Network Mode for Peak Performance

Use host network mode when network performance is critical. This shares the host’s network namespace:

```bash
docker run -d --network host my-high-performance-app
```

### Benefits:

* Minimal overhead
* Full access to host’s networking
* Simpler setup

⚠️ Be cautious about security and port conflicts.

## Docker Networking with Mac VLAN

Mac VLAN lets containers act like separate devices on the physical network. Each gets a unique MAC address and connects through the host’s interface.

### Use Cases:

* Legacy applications
* Security appliances
* Isolation scenarios

### Challenges:

* No DHCP support
* IP conflicts
* Complex setup

## Docker Networking with IP VLAN

IP VLAN is like Mac VLAN but shares MAC addresses and assigns unique IPs per container.

### Benefits:

* Improved network stability
* Strong isolation
* Suitable for apps needing dedicated IPs

Careful address planning is necessary.

## Docker Networking with IP VLAN L3 Networking

This advanced setup builds on IP VLAN for segmentation, routing, and tighter security.

### Features:

* Granular segmentation
* Custom routing
* Enhanced isolation

It suits microservices or multi-tenant setups but requires deeper configuration knowledge.

---

Mastering Docker networking is key to creating efficient, secure, and organized container environments. With the right network model, you can fine-tune performance, security, and communication in your containerized infrastructure.

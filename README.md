# P2SR Launcher

This is the repository for the Portal 2 Speedrunning Launcher, an in-development app to help manage information related to your Portal 2 so you don't have to dig into the filesystem. We use Wails, and Svelte.

## Prerequisites

Before you start development, ensure you have the following installed.

- [Go](golang.org/doc/install)
- [Node.js & npm](https://nodejs.org/en)

and any plugins your IDE has for Svelte

## Get Started

**Clone the repository**

```sh
git clone https://github.com/yourusername/Portal-2-Launcher.git
cd Portal-2-Launcher
```

**Setup Backend**

1. Install Go Dependencies

```golang
go mod tidy
```

**Frontend Setup**

1. Navigate to frontend and install dependencies

```sh
cd frontend
npm install
```

**Run the app**

For development run

```sh
wails dev
```

To Build run

```sh
wails build
```

## Goal Features

Here are the primary features we plan to get working before 1.0:

- **Notifications:** we plan to implement a feature for the [P2SR discord](https://discord.gg) where a mod can trigger a notification, just a simple popup that says something like "Hey there's a new rule on xyz, Read the message?" with a link to the post about the rule changes.
- **Modpacks:** we plan to make the hassle with modpacks, no more. Our goal is to allow for installing modpacks with just a click of a button with the knowledge that it is completely legal.
- **Managing SRConfigs:** this only applies to SRConfigs users but our goal is to be able to apply updates to SRConfigs automatically.

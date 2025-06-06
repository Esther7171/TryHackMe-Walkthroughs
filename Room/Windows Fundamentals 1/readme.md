# <div align='center'>[Windows Fundamentals 1](https://tryhackme.com/room/windowsfundamentals1xbx)</div>
<div align='center'>In part 1 of the Windows Fundamentals module, we'll start our journey learning about the Windows desktop, the NTFS file system, UAC, the Control Panel, and more..</div>
<div align='center'>
  <img src='https://github.com/user-attachments/assets/f29ee43c-32a9-4d5f-b308-4a34c687f3b4' height='200'></img>
</div>

## Task 1. Introduction to Windows
 

The Windows operating system (OS) is a complex product with many system files, utilities, settings, features, etc. 

This module will attempt to provide a general overview of just a handful of what makes up the Windows OS, navigate the user interface, make changes to the system, etc.  The content is aimed at those who wish to understand and use the Windows OS on a more comfortable level. 

Press the Start Machine button below to launch the attached virtual machine.

Start Machine
The virtual machine should open within your web browser. 

If you want to access the virtual machine via Remote Desktop , use the credentials below. 

Machine IP :  10.10.177.146

User :  administrator

Password :  letmein123!



Accept the Certificate when prompted, and you should be logged into the remote system now.

Note : The virtual machine may take up to 3 minutes to load.

Answer the questions below
### Read above and start the virtual machine.
```
No answer needed
```
## Task 2. Windows Editions

The Windows operating system has a long history dating back to 1985, and currently,  it is the dominant operating system in both home use and corporate networks. Because of this, Windows has always been targeted by hackers & malware writers.

Windows XP was a popular version of Windows and had a long-running. Microsoft announced Windows Vista , which was a complete overhaul of the Windows operating system. There were many issues with Windows Vista. It wasn't received well by Windows users, and it was quickly phased out.


When Microsoft announced the end-of-life date for Windows XP, many customers panicked. Corporations, hospitals, etc., scrambled and tested the next viable Windows  version , which was Windows 7, against many other hardware and devices. Vendors had to work against the clock to ensure their products worked with Windows 7 for their customers. If they couldn't, their customers had to break their agreement and find another vendor that upgraded their products to work with Windows 7. It was a nightmare for many, and Microsoft took note of it.

Windows 7, as quickly as it was released soon after, was marked with an end of support date.  Windows 8.x came and left and it was short-lived, like Vista.

Then arrived Windows 10 followed by Windows 11, which is the current Windows operating system version for desktop computers.

Then arrived Windows 10 followed by Windows 11, which is the current Windows operating system version for desktop computers.

Windows 11 comes in 2 flavors, Home and Pro. You can read the difference between the Home and Pro here.

Even though we didn’t talk about servers, the current version of the Windows operating system for servers is Windows Server 2025.

Many critics like to bash on Microsoft, but they have made long strides to improve the usability and security with each new version of Windows .

> Note : The Windows edition for the attached VM is Windows Server 2019 Standard, as seen in   System Information .

**Update** : As of June 2021, Microsoft announced the retirement dates for Windows 10 here . 

" Microsoft will continue to support at least one Windows 10 Semi-Annual Channel until October 14, 2025 ".

As of October 5th, 2021 - Windows 11 now is the current Windows operating system for end-users. Read more about Windows 11 here .  

Answer the questions below
### What encryption can you enable on Pro that you can't enable in Home?
```
BitLocker
```
## Task 3. The Desktop (GUI)

The Windows Desktop, aka the graphical user interface or GUI in short, is the screen that welcomes you once you log into a Windows 10 machine.

Traditionally, you need to pass the login screen first. The login screen is where you need to enter valid account credentials; usually, a username & password of a preexisting Windows account on that particular system or in the Active Directory environment (if it's a domain-joined machine). 

The above screenshot is an example of a typical Windows Desktop. Each component that makes up the GUI is explained briefly below.

1. The Desktop
2. Start Menu
3. Search Box (Cortana)
4. Task View
5. Taskbar
6. Toolbars
7. Notification Area

**The Desktop**

The desktop is where you will have shortcuts to programs, folders, files, etc. These icons will either be well organized in folders sorted alphabetically or scattered randomly with no specific organization on the desktop. In either case, these items are typically placed on the desktop for quick access.

The look and feel of the desktop can be changed to suit your liking. By right-clicking anywhere on the desktop, a context menu will appear. This menu will allow you to change the sizes of the desktop icons, specify how you want to arrange them, copy/paste items to the desktop, and create new items, such as a folder, shortcut, or text document.


Under **Display settings** , you can make changes to the screen's resolution and orientation. In case you have multiple computer screens, you can make configurations to the multi-screen setup here. 
> Note : In a Remote Desktop session, some of the display settings will be disabled. 

You can also change the wallpaper by selecting Personalize .

Under Personalize, you can change the background image to the Desktop, change fonts, themes, color scheme, etc. 

**The Start Menu**


In previous versions of Windows, the word Start was visible at the bottom left corner of the desktop GUI. In modern versions of Windows, such as Windows 10, the word 'Start' doesn't appear anymore, but rather a Windows Logo is shown instead. Even though the look of the Start Menu has changed, its overall purpose is the same. 

The Start Menu provides access to all the apps/programs, files, utility tools, etc., that are most useful. 

Clicking on the Windows logo, the Start Menu will open. The Start Menu is broken up into sections. See below.

1. This section of the Start Menu provides quick shortcuts to actions that you can perform with your account or login session, such as making changes to your user account, lock your screen, or signing out of your account. Other shortcuts specific to your account are your Documents (document icon) folder and Pictures folder (pictures icon). Lastly, the gear/cog icon will take you to the Settings screen, and the power icon will allow you to Disconnect from a Remote Desktop session, shut down the computer, or restart the computer.

In the below image, you can see what each of the icons represents. To expand this section, click on the icon that resembles a hamburger at the top.  



2. This section will show all Recently added apps/programs at the top and all the installed apps/programs (that are configured to appear in the Start Menu). In this section, you'll also see the apps/programs will be listed in alphabetical order. Each letter will have its own section. See below.


In the above image, the first box is where the recently added apps/programs will appear. The second box is where all the installed apps/programs will appear. 

> Note : In your VM, Google Chrome will not show up as a Recently Added program anymore.

If you have a LONG list of installed apps/programs, you can jump to a particular section in the list by clicking on the letter headings to launch an alphabet grid. See below.


> Note : The white letters match the letter headings. 

3. The right side of the Start Menu is where you will find icons for specific apps/programs or utilities. These icons are known as tiles . Some tiles are added to this section by default. If you right-click any of the tiles, you guessed it; a menu will appear to allow you to perform more actions on the selected tile; such as resizing the tile, unpinning from Start Menu, view its Properties, etc. See below.

Apps/programs can be added to this Start Menu section by right-clicking the app/program and selecting Pin to Start. See below.

**The Taskbar**
Some of the components are enabled and visible by default. The Toolbar (6), for example, was enabled for demonstration purposes.  

If you're like me and want to disable some of these components, you can right-click on Taskbar to bring up a context menu that will allow you to make changes.
Any apps/programs, folders, files, etc., that you open/start will appear in the taskbar. 

Hovering over the icon will provide a preview thumbnail, along with a tooltip. This  tooltip is handy if you have many apps/programs open, such as Google Chrome, and you wish to find which instance of Google Chrome is the one you need to bring in to focus. 

When you close any of these items, they will disappear from the taskbar (unless you explicitly pinned it to the taskbar). 

The Notification Area

The Notification Area, which is typically located at the bottom right of the Windows screen, is where the date and time are displayed. Other icons possibly visible in this area is the volume icon, network/wireless icon, to name a few. Icons can be either added or removed from the Notification Area in Taskbar settings. 

From there, scroll down to the Notification Area section to make changes. 

Here are Microsoft's brief documents for the Start Menu and   Notification Area .

Tip : You can right-click any folder, file, app/program, or icon to  view more information or perform other actions on the clicked item. 
## Task 4
The File System
The file system used in modern versions of  Windows  is the New Technology File System or simply  NTFS .

Before NTFS, there was  FAT16/FAT32 (File Allocation Table) and HPFS (High Performance File System). 

You still see FAT partitions in use today. For example, you typically see FAT partitions in USB devices, MicroSD cards, etc.  but traditionally not on personal Windows computers/laptops or Windows servers.

NTFS is known as a journaling file system. In case of a failure, the file system can automatically repair the folders/files on disk using information stored in a log file. This function is not possible with FAT.   

NTFS addresses many of the limitations of the previous file systems; such as: 

* Supports files larger than 4GB
* Set specific permissions on folders and files
* Folder and file compression
* Encryption ( Encryption File System or EFS )

If you're running Windows, what is the file system your Windows installation is using? You can check the Properties (right-click) of the drive your operating system is installed on, typically the C drive (C:\).

  
You can read Microsoft's official documentation on FAT, HPFS, and NTFS here . 

Let's speak briefly on some features that are specific to NTFS. 

On NTFS volumes, you can set permissions that grant or deny access to files and folders.

The permissions are:

* Full control
* Modify
* Read & Execute
* List folder contents
* Read
* Write
The below image lists the meaning of each permission on how it applies to a file and a folder. (credit  Microsoft )



How can you view the permissions for a file or folder?

* Right-click the file or folder you want to check for permissions.
* From the context menu, select Properties .
* Within Properties, click on the Security tab.
* In the Group or user names list, select the user, computer, or group whose permissions you want to view.

In the below image, you can see the permissions for the Users group for the Windows folder. 



Refer to the Microsoft documentation to get a better understanding of the NTFS permissions for  Special Permissions .

Another feature of NTFS is Alternate Data Streams ( ADS ).

Alternate Data Streams  (ADS) is a file attribute specific to Windows  NTFS  (New Technology File System).

Every file has at least one data stream ( $DATA ), and ADS allows files to contain more than one stream of data. Natively Window Explorer doesn't display ADS to the user. There are 3rd party executables that can be used to view this data, but Powershell gives you the ability to view ADS for files.

From a security perspective, malware writers have used ADS to hide data.

Not all its uses are malicious. For example, when you download a file from the Internet, there are identifiers written to ADS to identify that the file was downloaded from the Internet.

To learn more about ADS, refer to the following link from MalwareBytes here . 

Bonus : If you wish to interact hands-on with ADS, I suggest exploring Day 21 of  Advent of Cyber 2 .

Answer the questions below
What is the meaning of NTFS?
```
New Technology File System
```
## Task 5. The Windows\System32 Folders

The Windows folder (`C:\Windows`) is traditionally known as the folder which contains the Windows operating system. 
The folder doesn't have to reside in the C drive necessarily. It can reside in any other drive and technically can reside in a different folder.
This is where environment variables, more specifically system environment variables, come into play.  Even though not discussed yet, the system  environment variable for the Windows directory is `%windir%` .
*Per Microsoft , " Environment variables store information about the operating system environment. This information includes details such as the operating system path, the number of processors used by the operating system, and the location of temporary folders ".*

There are many folders within the 'Windows' folder. See below.
One of the many folders is System32 . 
The System32 folder holds the important files that are critical for the operating system.
You should proceed with extreme caution when interacting with this folder. Accidentally deleting any files or folders within System32 can render the Windows OS inoperational. Read more about this action here . 

> Note : Many of the tools that will be covered in the Windows Fundamentals series reside within the System32 folder. 

Answer the questions below
### What is the system variable for the Windows folder?
```
%windir%
```
## Task 6. User Accounts, Profiles, and Permissions
User accounts can be one of two types on a typical local Windows system: **Administrator** & **Standard User**. 

The user account type will determine what actions the user can perform on that specific Windows system. 
* An Administrator can make changes to the system: add users, delete users, modify groups, modify settings on the system, etc.
* A Standard User can only make changes to folders/files attributed to the user & can't perform system-level changes, such as install programs.

You are currently logged in as an Administrator. There are several ways to determine which user accounts exist on the system. 










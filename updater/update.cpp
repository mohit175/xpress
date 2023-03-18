#include <cstdio>
#include <iostream>
#include <memory>
#include <stdexcept>
#include <string>
#include <cstring>
#include <array>
#include <unistd.h>

std::string exec(const char* cmd) {
    std::array<char, 128> buffer;
    std::string result;
    std::unique_ptr<FILE, decltype(&pclose)> pipe(popen(cmd, "r"), pclose);
    if (!pipe) {
        throw std::runtime_error("popen() failed!");
    }
    while (fgets(buffer.data(), buffer.size(), pipe.get()) != nullptr) {
        result += buffer.data();
    }
    return result;
}

int main(int argc, char** argv) 
{
  setuid(0);
  std::string command;
  const char * char_command;
  if(strcmp(argv[1],"list_branches") == 0){
    exec("cd /xpress-js/ && git fetch --prune");
    std::string branches = exec("cd /xpress-js/ && git branch -r");
    std::cout << branches;
  }
  if(strcmp(argv[1],"list_folders") == 0){
    std::string branches = exec("cd /var/www/test/ && ls -l | grep '^d'");
    std::cout << branches;
  }
  if(strcmp(argv[1],"update_software") == 0){
    std::string branch  = argv[2];
    std::string folder  = argv[3];
    std::string version = argv[4];
    command = "cd /xpress-js/ && git pull && git checkout " + branch;
    char_command = command.c_str();
    std::cout << exec(char_command);
    command = "cd /xpress-js/ && rsync -vr --delete --copy-links "
      "--exclude-from=/xpress-js/rsync_exclude /xpress-js/ " + folder;
    char_command = command.c_str();
    std::cout << exec(char_command);
    command = "cd /xpress-js/js/secure/ && cat const.js binding.js "
      "calculations.js user.class.js paper.js xpress.js tour.js script.js "
      "user.js > " + folder + "/js/all_tmp.js";
    char_command = command.c_str();
    std::cout << exec(char_command);
    command = "cd /xpress-js/jsLibs/ && cat templates.js datalist.js "
      "jquery.extend.js cuts.js > " + folder + "/jsLibs/all_tmp.js";
    char_command = command.c_str();
    std::cout << exec(char_command);
    command = "cd /xpress-js/css/ && cat style.css guides.css user.css > " 
      + folder + "/css/all_tmp.css";
    char_command = command.c_str();
    std::cout << exec(char_command);
    command = "cd " + folder + "/css && uglifycss all_tmp.css > all.css";
    char_command = command.c_str();
    std::cout << exec(char_command);
    command = "cd " + folder + "/js/ && "
      "/root/node_modules/javascript-obfuscator/bin/javascript-obfuscator "
      "./all_tmp.js --output ./all.js";
    char_command = command.c_str();
    std::cout << exec(char_command);
    command = "cd " + folder + "/jsLibs/ && "
      "/root/node_modules/javascript-obfuscator/bin/javascript-obfuscator "
      "./all_tmp.js --output ./all.js";
    char_command = command.c_str();
    std::cout << exec(char_command);
    command = "cd " + folder + " && sed -i 's/__VERSION__/" + version + 
      "/' top.php";
    char_command = command.c_str();
    std::cout << exec(char_command);
    command = "cd " + folder + " && sed -i 's/__VERSION__/" + version + 
      "/' index.php";
    char_command = command.c_str();
    std::cout << exec(char_command);
    command = "cd " + folder + " && sed -i 's/__VERSION__/" + version + 
      "/' home.php";
    char_command = command.c_str();
    std::cout << exec(char_command);
    command = "cd " + folder + " && sed -i 's/__VERSION__/" + version + 
      "/' admin.php";
    char_command = command.c_str();
    std::cout << exec(char_command);
  }
  return 0;
}


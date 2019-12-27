




import subprocess as sb
import time

import threading # plan to use


maxMinutes  = 666 # in minutes

cmd_connect = ['expressvpn', 'connect']
cmd_off     = ['expressvpn', 'disconnect']
cmd_status  = ['expressvpn', 'status']

VpnConnect    = "expressvpn connect"
VpnDisconnect = "expressvpn disconnect"
VpnStatus     = "expressvpn status"

#cmd_connect = ['echo', 'connect']
#cmd_off     = ['echo', 'disconnect']
#cmd_status  = ['echo', 'status']


timeBox    = [time.time(), 0]

def limitMinute(min):
    sec = min * 60.0
    if time.time() - timeBox[0] > sec:
        print('time passed ', min, 'min', sec, 's')
        return True
    else:
        return False


def keep():
    print("run: ", VpnConnect)
    first = sb.run(VpnConnect, stdout=sb.PIPE, shell=True)

    out = first.stdout.decode('utf-8')
    if not out:
        print('no out')
    print(first.stdout.decode('utf-8'))

    #print('return...')
    #return

    ok = ['Connected', 'Connecting', 'Reconnecting']

    while(True):
        print("run: ", VpnStatus)
        proc = sb.run(VpnStatus, stdout=sb.PIPE, shell=True)

        out  = proc.stdout.decode('utf-8')
        print('status stdout:\r\n', out)

        connect_needed = True
        for good_condition in ok:
            if out.count(good_condition):
                print('...python time.sleep, got status: ', good_condition)
                time.sleep(60)
                connect_needed = False
                continue


        if connect_needed:
            print("run: ", VpnConnect)
            again = sb.run(VpnConnect, stdout=sb.PIPE, shell=True)
            print(again.stdout.decode('utf-8'))
            time.sleep(60)

        if limitMinute(maxMinutes):
            break

    disconn = sb.run(VpnDisconnect, stdout=sb.PIPE, shell=True)
    print(disconn.stdout.decode('utf-8'))


if __name__ == '__main__':
    keep()



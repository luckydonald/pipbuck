#!/usr/bin/env bash
set -e -x

FOLDER=~/Downloads/Pipboy_\&_UI_Sounds/Fallout_4/
SEARCH='*.xwm'
VLC='/Applications/VLC.app/Contents/MacOS/VLC'

# IN='~/Downloads/Pipboy_&_UI_Sounds/Fallout_4/Sound/FX/UI/Lockpicking/UI_Lockpicking_CylinderSqueak_01.xwm'
# OUT='/tmp/test.mp3'
# VLC='/Applications/VLC.app/Contents/MacOS/VLC'

# $VLC ${IN} --sout="#transcode{acodec=mp3,vcodec=dummy}:standard{access=file,mux=raw,dst=${OUT}}" vlc://quit

#dst=`dirname "$file"`
#new=`basename "$file" | sed 's@\.[a-z][a-z][a-z]$@@'`.mp3
#
#echo $VLC -I dummy  --no-sout-video --sout-audio  --audio -vv \
#    --no-sout-rtp-sap --no-sout-standard-sap --ttl=1 --sout-keep \
#    --sout-transcode-aenc=s16l \
#    #--sout "#transcode{acodec=s16l,channels=2}:std{access=file,mux=wav,dst=${OUT}}" \
#    file://${IN} vlc://quit
#
##$VLC --sout "#transcode{acodec=mp3,ab=128,channels=2,samplerate=44100}:std{access=file,mux=raw,dst=$OUT}" $IN
#echo $VLC --sout "#transcode{acodec=s16l,channels=2,samplerate=44100}:std{access=file,mux=wav,dst=$OUT}" $IN
#$VLC --sout "#transcode{acodec=s16l,channels=2,samplerate=44100}:std{access=file,mux=wav,dst=$OUT}" $IN

function encode() {
    file=$1
    echo "=> Transcoding '$file'... "

    dst=`dirname "$file"`
    new=`basename "$file" | sed 's@\.[a-z][a-z][a-z]$@@'`.mp3
    OUT=$dst/$new

    $VLC $file --sout="#transcode{acodec=mp3,vcodec=dummy}:standard{access=file,mux=raw,dst=\"${OUT}\"}" vlc://quit
    # $VLC -I dummy -q "$file" \
    #    --sout "#transcode{acodec=s16l,channels=2,samplerate=44100}:std{access=file,mux=wav,dst=$OUT}" \
    #    vlc://quit
    ls -lh "$file" "$OUT"
}

# https://stackoverflow.com/a/4321522/3423324#find-exec-a-shell-function-in-linux
export -f encode
export VLC
# https://stackoverflow.com/a/5927391/3423324#recursively-look-for-files-with-a-specific-extension
find $FOLDER -type f -name $SEARCH -exec bash -c 'encode "$0"' {} \;


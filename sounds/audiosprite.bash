#!/usr/bin/env bash


audiosprite \
    --output pipbuck_sprites \
    --path ../public/ \
    --export "ogg,m4a,mp3,ac3,webm" \
    --format howler \
    --silence 1 \
    --gap 1 \
    --channels 2 \
    --loop ui_radio_static_lp \
    --loop UI_Pipboy_Radio_StaticBackground_LP \
    --loop UI_Radio_Static_LP \
    --loop ui_pipboy_hum_lp \
    --loop UI_PipBoy_Hum_LP \
    --loop ui_health_heartbeat_a_lp \
    --loop ui_health_heartbeat_b_lp \
    $FALLOUT3NW/sound/fx/ui/pipboy/ui_pipboy_mode.wav \
    $FALLOUT3NW/sound/fx/ui/pipboy/ui_pipboy_select.wav \
    $FALLOUT3NW/sound/fx/ui/pipboy/ui_pipboy_tab.wav \
    $FALLOUT3NW/sound/fx/ui/menu/ui_menu_cancel.wav \
    $FALLOUT3NW/sound/fx/ui/menu/ui_menu_focus.wav \
    $FALLOUT3NW/sound/fx/ui/menu/ui_menu_ok.wav \
    $FALLOUT3NW/sound/fx/ui/menu/ui_menu_prevnext.wav \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/UI_PipBoy_Quest_Active_01.wav \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/UI_PipBoy_Quest_Inactive_01.wav \
    $FALLOUT3NW/sound/fx/ui/pipboy/ui_pipboy_tuner.wav \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/RotaryHorizontal/UI_PipBoy_RotaryHorizontal_01.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/RotaryHorizontal/UI_PipBoy_RotaryHorizontal_02.mp3 \
    $FALLOUT3NW/sound/fx/ui/pipboy/ui_pipboy_holotape_start.wav \
    $FALLOUT3NW/sound/fx/ui/pipboy/ui_pipboy_holotape_stop.wav \
    $FALLOUT3NW/sound/fx/ui/loadscreen/initial/ui_loadscreen_initial.wav \
    ${FALLOUT4}/Sound/FX/UI/UI_Discover_Location_01.mp3 \
    $FALLOUT3NW/sound/fx/ui/ui_karma_up.wav \
    $FALLOUT3NW/sound/fx/ui/ui_karma_down.wav \
    $FALLOUT3NW/sound/fx/ui/ui_leveluptext.wav \
    $FALLOUT3NW/sound/fx/ui/health/heartbeat/ui_health_heartbeat_a_lp.wav \
    $FALLOUT3NW/sound/fx/ui/health/heartbeat/ui_health_heartbeat_b_lp.wav \
    $FALLOUT3NW/sound/fx/ui/health/heartbeat/ui_health_chems_wearoff.wav \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/BootSequence/UI_PipBoy_BootSequence_A.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/BootSequence/UI_PipBoy_BootSequence_B.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/BootSequence/UI_PipBoy_BootSequence_C.mp3 \
    $FALLOUT3NW/sound/fx/ui/radio/ui_radio_static_lp.wav \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radio/UI_Pipboy_Radio_StaticBackground_LP.wav \
    ${FALLOUT4}/Sound/FX/UI/Test/Radio/UI_Radio_Static_LP.wav \
    $FALLOUT3NW/sound/fx/ui/pipboy/ui_pipboy_hum_lp.wav \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/UI_PipBoy_Hum_LP.wav \
    $FALLOUT3NW/sound/fx/ui/pipboy/static/ui_static_c_01.wav \
    $FALLOUT3NW/sound/fx/ui/pipboy/static/ui_static_c_02.wav \
    $FALLOUT3NW/sound/fx/ui/pipboy/static/ui_static_c_03.wav \
    $FALLOUT3NW/sound/fx/ui/pipboy/static/ui_static_c_04.wav \
    $FALLOUT3NW/sound/fx/ui/pipboy/static/ui_static_c_05.wav \
    $FALLOUT3NW/sound/fx/ui/pipboy/static/ui_static_d_01.wav \
    $FALLOUT3NW/sound/fx/ui/pipboy/static/ui_static_d_02.wav \
    $FALLOUT3NW/sound/fx/ui/pipboy/static/ui_static_d_03.wav \
    $FALLOUT3NW/sound/fx/ui/pipboy/static/ui_static_d_04.wav \
    $FALLOUT3NW/sound/fx/ui/pipboy/static/ui_static_d_05.wav \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/BurstStatic/UI_PipBoy_BurstStatic_01.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/BurstStatic/UI_PipBoy_BurstStatic_02.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/BurstStatic/UI_PipBoy_BurstStatic_03.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/BurstStatic/UI_PipBoy_BurstStatic_04.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/BurstStatic/UI_PipBoy_BurstStatic_05.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/BurstStatic/UI_PipBoy_BurstStatic_06.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/BurstStatic/UI_PipBoy_BurstStatic_07.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/BurstStatic/UI_PipBoy_BurstStatic_08.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/BurstStatic/UI_PipBoy_BurstStatic_09.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/BurstStatic/UI_PipBoy_BurstStatic_10.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/BurstStatic/UI_PipBoy_BurstStatic_12.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/BurstStatic/UI_PipBoy_BurstStatic_13.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/BurstStatic/UI_PipBoy_BurstStatic_16.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/BurstStatic/UI_PipBoy_BurstStatic_17.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/BurstStatic/UI_PipBoy_BurstStatic_17.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_A_01.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_A_02.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_A_03.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_A_04.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_B_01.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_B_02.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_B_03.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_B_04.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_C_01.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_C_02.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_C_03.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_C_04.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_D_01.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_D_02.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_D_03.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_D_04.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_E_01.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_E_02.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_E_03.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_E_04.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_F_01.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_F_02.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_F_03.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_F_04.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_G_01.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_G_02.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_G_03.mp3 \
    ${FALLOUT4}/Sound/FX/UI/PipBoy/Radiation/UI_PipBoy_Radiation_G_04.mp3 \
&& echo 'k.';

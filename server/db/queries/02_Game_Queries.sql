---- most max wins and max losses in a group for a specific game ---

--- most losses in a group for a specific game ---
select games.name,
 players.name,
 count(CASE WHEN matches_players.is_winner THEN 1 END) as wins,
    (select count(*)) - count(CASE WHEN matches_players.is_winner THEN 1 END) as losses
from games
join groups on games.group_id = groups.id
join matches on games.id = matches.game_id
join matches_players on matches.id = matches_players.match_id
join players on matches_players.player_id = players.id
where groups.id = 1
and games.id = 2
group by games.name, players.name
order by losses desc
limit 1
;


-- most wins in a group for a specific game --- This seems like its the correct code
select games.name as game,
 players.name as player,
 count(CASE WHEN matches_players.is_winner THEN 1 END) as wins,
    (select count(*)) - count(CASE WHEN matches_players.is_winner THEN 1 END) as losses
from games
join groups on games.group_id = groups.id
join matches on games.id = matches.game_id
join matches_players on matches.id = matches_players.match_id
join players on matches_players.player_id = players.id
where groups.id = 1

group by game, player
order by wins desc
;


-- select games.name,
--  players.name,
--  count(matches_players.is_winner) as wins,
--     (select count(*)) - count(matches_players.is_winner) as losses
-- from games
-- join groups on games.group_id = groups.id
-- join matches on games.id = matches.game_id
-- join matches_players on matches.id = matches_players.match_id
-- join players on matches_players.player_id = players.id
-- where groups.id = 1
-- and games.name = 'Catan'
-- group by games.name, players.name
-- ;

--  Gives you group Id , game , player name and all wins and loses for per game
-- Good stats
SELECT gm.group_id, g.name AS game_name, p.id, p.name,
       COUNT(CASE WHEN mp.is_winner = TRUE THEN 1 END) AS total_wins,
       COUNT(CASE WHEN mp.is_winner = FALSE THEN 1 END) AS total_losses
FROM groups_matches gm
JOIN matches m ON m.id = gm.match_id
JOIN games g ON g.id = m.game_id
JOIN matches_players mp ON mp.match_id = m.id
JOIN players p ON p.id = mp.player_id
WHERE gm.group_id = 1
GROUP BY gm.group_id, g.id, p.id, p.name
ORDER BY gm.group_id, g.id, total_wins DESC, total_losses DESC;

-- Kinda working
SELECT gm.group_id, g.name AS game_name,
    (SELECT p.name
     FROM matches_players mp
     JOIN players p ON p.id = mp.player_id
     WHERE mp.match_id = m.id AND mp.is_winner = TRUE
     GROUP BY p.id
     ORDER BY COUNT(*) DESC
     LIMIT 1) AS most_wins_player,
    (SELECT p.name
     FROM matches_players mp
     JOIN players p ON p.id = mp.player_id
     WHERE mp.match_id = m.id AND mp.is_winner = FALSE
     GROUP BY p.id
     ORDER BY COUNT(*) DESC
     LIMIT 1) AS most_losses_player
FROM groups_matches gm
JOIN matches m ON m.id = gm.match_id
JOIN games g ON g.id = m.game_id
WHERE gm.group_id = 1
GROUP BY gm.group_id, g.id, m.id
ORDER BY gm.group_id, g.id;


-- Works for the games that have been played
SELECT g.id AS game_id, g.name AS name, g.description As description,
       (SELECT p.name FROM matches_players mp
        JOIN players p ON mp.player_id = p.id
        WHERE mp.match_id = m.id AND mp.is_winner = TRUE
        GROUP BY mp.player_id, p.name ORDER BY COUNT(*) DESC LIMIT 1) AS player_most_wins,
       (SELECT p.name FROM matches_players mp
        JOIN players p ON mp.player_id = p.id
        WHERE mp.match_id = m.id AND mp.is_winner = FALSE
        GROUP BY mp.player_id, p.name ORDER BY COUNT(*) DESC LIMIT 1) AS player_most_losses
FROM groups_matches gm
JOIN matches m ON m.id = gm.match_id
JOIN games g ON g.id = m.game_id
WHERE gm.group_id = 1
GROUP BY g.id, g.name, m.id
ORDER BY g.id;

-- All games Almost working however multiple columns if tied for winner or loser
SELECT g.id AS game_id, g.name AS name, g.description As description,
  COALESCE(
    (SELECT p.name FROM matches_players mp
     JOIN players p ON mp.player_id = p.id
     WHERE mp.match_id = m.id AND mp.is_winner = TRUE
     GROUP BY mp.player_id, p.name ORDER BY COUNT(*) DESC LIMIT 1),
    'To Be Determined'
  ) AS player_most_wins,
  COALESCE(
    (SELECT p.name FROM matches_players mp
     JOIN players p ON mp.player_id = p.id
     WHERE mp.match_id = m.id AND mp.is_winner = FALSE
     GROUP BY mp.player_id, p.name ORDER BY COUNT(*) DESC LIMIT 1),
    'To Be Determined'
  ) AS player_most_losses
FROM games g
LEFT JOIN matches m ON m.game_id = g.id
LEFT JOIN groups_matches gm ON gm.match_id = m.id
WHERE gm.group_id = 1
GROUP BY g.id, g.name, m.id
ORDER BY g.id;


